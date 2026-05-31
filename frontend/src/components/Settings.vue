<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '../api/client'

interface User {
  id: number
  name: string
  login_name: string
}

const user = ref<User | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const saveSuccess = ref(false)

const editName = ref('')
const editLoginName = ref('')

async function fetchUser() {
  isLoading.value = true
  error.value = null
  try {
    const response = await apiClient.get<{ status: string; data: User }>('/user')
    user.value = response.data.data
    editName.value = user.value.name
    editLoginName.value = user.value.login_name
  } catch {
    error.value = 'ユーザー情報の取得に失敗しました'
  } finally {
    isLoading.value = false
  }
}

async function saveUser() {
  error.value = null
  saveSuccess.value = false
  try {
    const response = await apiClient.put<{ status: string; data: User }>('/user', {
      name: editName.value,
      login_name: editLoginName.value,
    })
    user.value = response.data.data
    saveSuccess.value = true
    setTimeout(() => (saveSuccess.value = false), 3000)
  } catch {
    error.value = '設定の保存に失敗しました'
  }
}

onMounted(fetchUser)
</script>

<template>
  <div>
    <div class="header">
      <h1>⚙️ 設定</h1>
      <p>アプリケーションの設定を管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/">HOME</router-link></li>
        <li class="history"><router-link to="/history">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings" class="active">設定</router-link></li>
      </ul>
    </nav>

    <div class="settings-container">
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isLoading">読み込み中...</p>

      <template v-else>
        <div class="setting-group">
          <h3>アカウント設定</h3>
          <label class="setting-item">
            <span>表示名</span>
            <input v-model="editName" type="text" placeholder="表示名" />
          </label>
          <label class="setting-item">
            <span>ログイン名</span>
            <input v-model="editLoginName" type="text" placeholder="ログイン名" />
          </label>
        </div>

        <p v-if="saveSuccess" class="success-message">設定を保存しました</p>

        <button @click="saveUser" class="save-btn" :disabled="!editName || !editLoginName">
          設定を保存
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped src="../assets/css/settings.css"></style>
