<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import apiClient from '../api/client'

type Status = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface Task {
  id: number
  name: string
  description: string | null
  status: Status
  exec_expected_date: string | null
  deadline: string | null
  category: string | null
}

const STATUS_LABELS: Record<Status, string> = {
  TODO: '未着手',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
  CANCELLED: 'キャンセル',
}

const STATUS_LIST: Status[] = ['TODO', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

const tasks = ref<Task[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const activeStatus = ref<Status | 'ALL'>('ALL')

const showForm = ref(false)
const editingId = ref<number | null>(null)
const form = ref({
  taskTitle: '',
  taskDescription: '',
  taskStatusId: 'TODO' as Status,
  taskStartTime: '',
  taskEndTime: '',
})

const filteredTasks = computed(() =>
  activeStatus.value === 'ALL'
    ? tasks.value
    : tasks.value.filter((t) => t.status === activeStatus.value),
)

function countByStatus(status: Status): number {
  return tasks.value.filter((t) => t.status === status).length
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })
}

async function fetchTasks() {
  isLoading.value = true
  error.value = null
  try {
    const response = await apiClient.get<{ status: string; data: Task[] }>('/tasks')
    tasks.value = response.data.data
  } catch {
    error.value = 'タスクの取得に失敗しました'
  } finally {
    isLoading.value = false
  }
}

function openCreateForm() {
  editingId.value = null
  form.value = {
    taskTitle: '',
    taskDescription: '',
    taskStatusId: 'TODO',
    taskStartTime: '',
    taskEndTime: '',
  }
  showForm.value = true
}

function openEditForm(task: Task) {
  editingId.value = task.id
  form.value = {
    taskTitle: task.name,
    taskDescription: task.description ?? '',
    taskStatusId: task.status,
    taskStartTime: task.exec_expected_date?.slice(0, 10) ?? '',
    taskEndTime: task.deadline?.slice(0, 10) ?? '',
  }
  showForm.value = true
}

async function submitForm() {
  if (!form.value.taskTitle.trim() || !form.value.taskDescription.trim()) return
  error.value = null
  try {
    if (editingId.value !== null) {
      const response = await apiClient.put<{ status: string; data: Task }>(
        `/tasks/${editingId.value}`,
        form.value,
      )
      const idx = tasks.value.findIndex((t) => t.id === editingId.value)
      if (idx !== -1) tasks.value[idx] = response.data.data
    } else {
      const response = await apiClient.post<{ status: string; data: Task }>('/tasks', form.value)
      tasks.value.push(response.data.data)
    }
    showForm.value = false
  } catch {
    error.value = editingId.value !== null ? 'タスクの更新に失敗しました' : 'タスクの追加に失敗しました'
  }
}

async function deleteTask(id: number) {
  error.value = null
  try {
    await apiClient.delete(`/tasks/${id}`)
    tasks.value = tasks.value.filter((t) => t.id !== id)
  } catch {
    error.value = 'タスクの削除に失敗しました'
  }
}

onMounted(fetchTasks)
</script>

<template>
  <div>
    <div class="header">
      <h1>📚 学習管理ボード</h1>
      <p>毎日の学習タスクを効率的に管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/" class="active">HOME</router-link></li>
        <li class="history"><router-link to="/history">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings">設定</router-link></li>
      </ul>
    </nav>

    <div class="container">
      <p v-if="error" class="error-message">{{ error }}</p>

      <div class="toolbar">
        <div class="status-tabs">
          <button
            class="status-tab"
            :class="{ active: activeStatus === 'ALL' }"
            @click="activeStatus = 'ALL'"
          >
            すべて ({{ tasks.length }})
          </button>
          <button
            v-for="s in STATUS_LIST"
            :key="s"
            class="status-tab"
            :class="{ active: activeStatus === s, [`tab-${s.toLowerCase()}`]: true }"
            @click="activeStatus = s"
          >
            {{ STATUS_LABELS[s] }} ({{ countByStatus(s) }})
          </button>
        </div>
        <button @click="openCreateForm" class="add-btn">＋ タスクを追加</button>
      </div>

      <div v-if="showForm" class="task-form">
        <input v-model="form.taskTitle" placeholder="タスク名（必須）" />
        <input v-model="form.taskDescription" placeholder="説明（必須）" />
        <div class="form-row">
          <label>
            <span>ステータス</span>
            <select v-model="form.taskStatusId">
              <option v-for="s in STATUS_LIST" :key="s" :value="s">{{ STATUS_LABELS[s] }}</option>
            </select>
          </label>
          <label>
            <span>開始予定日</span>
            <input v-model="form.taskStartTime" type="date" />
          </label>
          <label>
            <span>期限</span>
            <input v-model="form.taskEndTime" type="date" />
          </label>
        </div>
        <div class="form-actions">
          <button
            @click="submitForm"
            :disabled="!form.taskTitle || !form.taskDescription"
            class="save-btn"
          >
            {{ editingId !== null ? '更新' : '追加' }}
          </button>
          <button @click="showForm = false" class="cancel-btn">キャンセル</button>
        </div>
      </div>

      <p v-if="isLoading">読み込み中...</p>

      <template v-else>
        <p v-if="filteredTasks.length === 0">タスクがありません。</p>
        <div class="task-list">
          <div v-for="task in filteredTasks" :key="task.id" class="task-card" :class="task.status.toLowerCase()">
            <div class="task-header">
              <span class="task-name">{{ task.name }}</span>
              <span class="status-badge" :class="task.status.toLowerCase()">
                {{ STATUS_LABELS[task.status] }}
              </span>
            </div>
            <p v-if="task.description" class="task-desc">{{ task.description }}</p>
            <div class="task-meta">
              <span>開始: {{ formatDate(task.exec_expected_date) }}</span>
              <span>期限: {{ formatDate(task.deadline) }}</span>
            </div>
            <div class="task-actions">
              <button @click="openEditForm(task)" class="edit-btn">編集</button>
              <button @click="deleteTask(task.id)" class="delete-btn">削除</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: var(--app-max-width);
  margin: 0 auto;
  padding: 20px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.status-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.status-tab {
  padding: 6px 14px;
  border: 1px solid var(--app-color-neutral);
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  &.active { background: var(--app-color-primary); color: white; border-color: var(--app-color-primary); }
}

.add-btn {
  padding: 8px 20px;
  background: var(--app-color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  border: 1px solid var(--app-color-neutral);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  input, select { padding: 8px 10px; border: 1px solid var(--app-color-neutral); border-radius: 6px; }
}

.form-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    color: var(--app-text-secondary);
  }
}

.form-actions {
  display: flex;
  gap: 10px;
}

.save-btn {
  padding: 8px 20px;
  background: var(--app-color-primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.cancel-btn {
  padding: 8px 20px;
  background: var(--app-color-secondary);
  border: 1px solid var(--app-color-neutral);
  border-radius: 6px;
  cursor: pointer;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-card {
  background: white;
  border-left: 4px solid var(--app-color-neutral);
  border-radius: 6px;
  padding: 16px;
  box-shadow: var(--app-shadow-card);

  &.todo { border-left-color: #9e9e9e; }
  &.in_progress { border-left-color: var(--app-color-warning); }
  &.completed { border-left-color: var(--app-color-primary); }
  &.cancelled { border-left-color: var(--app-color-danger); }
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.task-name {
  font-weight: bold;
  color: var(--app-text-primary);
}

.status-badge {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: bold;

  &.todo { background: #f0f0f0; color: #666; }
  &.in_progress { background: #fff3e0; color: #e65100; }
  &.completed { background: #e8f5e9; color: #2e7d32; }
  &.cancelled { background: #fce4ec; color: #c62828; }
}

.task-desc {
  font-size: 14px;
  color: var(--app-text-secondary);
  margin: 4px 0 8px;
}

.task-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--app-text-muted);
  margin-bottom: 10px;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.edit-btn {
  padding: 4px 14px;
  background: var(--app-color-secondary);
  border: 1px solid var(--app-color-neutral);
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.delete-btn {
  padding: 4px 14px;
  background: white;
  border: 1px solid var(--app-color-danger);
  color: var(--app-color-danger);
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
</style>
