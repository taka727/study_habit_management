<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '../api/client'

interface Goal {
  id: number
  name: string
  description: string | null
  goal_deadline: string
}

const goals = ref<Goal[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const showForm = ref(false)
const editingId = ref<number | null>(null)
const form = ref({ name: '', description: '', goal_deadline: '' })

function formatDeadline(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

async function fetchGoals() {
  isLoading.value = true
  error.value = null
  try {
    const response = await apiClient.get<{ status: string; data: Goal[] }>('/goals')
    goals.value = response.data.data
  } catch {
    error.value = 'マイルストーンの取得に失敗しました'
  } finally {
    isLoading.value = false
  }
}

function openCreateForm() {
  editingId.value = null
  form.value = { name: '', description: '', goal_deadline: '' }
  showForm.value = true
}

function openEditForm(goal: Goal) {
  editingId.value = goal.id
  form.value = {
    name: goal.name,
    description: goal.description ?? '',
    goal_deadline: goal.goal_deadline.slice(0, 10),
  }
  showForm.value = true
}

async function submitForm() {
  if (!form.value.name.trim() || !form.value.goal_deadline) return
  error.value = null
  try {
    const payload = {
      name: form.value.name.trim(),
      description: form.value.description.trim() || null,
      goal_deadline: form.value.goal_deadline,
    }
    if (editingId.value !== null) {
      const response = await apiClient.put<{ status: string; Goal: Goal }>(
        `/goals/${editingId.value}`,
        payload,
      )
      const idx = goals.value.findIndex((g) => g.id === editingId.value)
      if (idx !== -1) goals.value[idx] = response.data.Goal
    } else {
      const response = await apiClient.post<{ status: string; Goal: Goal }>('/goals', payload)
      goals.value.push(response.data.Goal)
    }
    showForm.value = false
  } catch {
    error.value = editingId.value !== null ? '更新に失敗しました' : '追加に失敗しました'
  }
}

async function deleteGoal(id: number) {
  error.value = null
  try {
    await apiClient.delete(`/goals/${id}`)
    goals.value = goals.value.filter((g) => g.id !== id)
  } catch {
    error.value = '削除に失敗しました'
  }
}

onMounted(fetchGoals)
</script>

<template>
  <div>
    <div class="header">
      <h1>🎯 マイルストーン</h1>
      <p>学習目標の進捗を管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/">HOME</router-link></li>
        <li class="history"><router-link to="/history">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone" class="active">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings">設定</router-link></li>
      </ul>
    </nav>

    <div class="milestone-container">
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isLoading">読み込み中...</p>

      <button @click="openCreateForm" class="add-btn">＋ 新しい目標を追加</button>

      <div v-if="showForm" class="goal-form">
        <input v-model="form.name" placeholder="目標名（必須）" />
        <input v-model="form.description" placeholder="説明（任意）" />
        <label class="form-date-label">
          <span>達成期限</span>
          <input v-model="form.goal_deadline" type="date" />
        </label>
        <div class="form-actions">
          <button
            @click="submitForm"
            :disabled="!form.name || !form.goal_deadline"
            class="save-btn"
          >
            {{ editingId !== null ? '更新' : '追加' }}
          </button>
          <button @click="showForm = false" class="cancel-btn">キャンセル</button>
        </div>
      </div>

      <template v-if="!isLoading">
        <p v-if="goals.length === 0 && !showForm">目標がありません。</p>
        <div v-for="goal in goals" :key="goal.id" class="milestone-card">
          <div class="milestone-header">
            <h3>{{ goal.name }}</h3>
            <span class="target-date">期限: {{ formatDeadline(goal.goal_deadline) }}</span>
          </div>
          <p v-if="goal.description" class="description">{{ goal.description }}</p>
          <div class="card-actions">
            <button @click="openEditForm(goal)" class="edit-btn">編集</button>
            <button @click="deleteGoal(goal.id)" class="delete-btn">削除</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped src="../assets/css/milestone.css"></style>
