<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '../api/client'

interface Book {
  id: number
  title: string
  description: string | null
}

const books = ref<Book[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const showForm = ref(false)
const newTitle = ref('')
const newDescription = ref('')

const titlePlaceholder = ref('タイトル（必須）')
const isTitleError = ref(false)

async function fetchBooks() {
  isLoading.value = true
  error.value = null
  try {
    const response = await apiClient.get<{ status: string; data: Book[] }>('/books')
    books.value = response.data.data
  } catch {
    error.value = '書籍の取得に失敗しました'
  } finally {
    isLoading.value = false
  }
}

async function addBook() {
  if (!newTitle.value.trim()) {
    isTitleError.value = true
    titlePlaceholder.value = 'エラー：タイトルは必須です'
    return
  }

  try {
    const response = await apiClient.post<{ status: string; book: Book }>('/books', {
      title: newTitle.value.trim(),
      description: newDescription.value.trim() || null,
    })
    books.value.push(response.data.book)

    // 成功したらフォームをリセット
    newTitle.value = ''
    newDescription.value = ''
    titlePlaceholder.value = 'タイトル（必須）'
    isTitleError.value = false
    showForm.value = false
  } catch {
    error.value = '書籍の追加に失敗しました'
  }
}

function handleTitleInput() {
  if (newTitle.value.length > 0) {
    isTitleError.value = false
    titlePlaceholder.value = 'タイトル（必須）'
  }
}

async function deleteBook(id: number) {
  try {
    await apiClient.delete(`/books/${id}`)
    books.value = books.value.filter((b) => b.id !== id)
  } catch {
    error.value = '書籍の削除に失敗しました'
  }
}

onMounted(fetchBooks)
</script>

<template>
  <div>
    <div class="header">
      <h1>📚 読書記録</h1>
      <p>学習に関連する書籍の記録を管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/">HOME</router-link></li>
        <li class="history"><router-link to="/history">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading" class="active">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings">設定</router-link></li>
      </ul>
    </nav>
    <div class="reading-container">
      <p v-if="error" class="error-message">{{ error }}</p>

      <button @click="showForm = !showForm" class="add-book-btn">📖 新しい本を追加</button>

      <div v-if="showForm" class="add-book-form">
        <input
          v-model="newTitle"
          id="new-title"
          class="input-title"
          :class="{ 'input-error': isTitleError }"
          :placeholder="titlePlaceholder"
          @input="handleTitleInput"
        />
        <input v-model="newDescription" id="new-description" class="input-description" placeholder="メモ（任意）" />
        <button @click="addBook" class="form-btn">追加</button>
        <button @click="showForm = false" class="form-btn">キャンセル</button>
      </div>

      <p v-if="isLoading">読み込み中...</p>

      <div v-else class="book-grid">
        <div v-for="book in books" :key="book.id" class="book-card">
          <div class="book-header">
            <h3>{{ book.title }}</h3>
          </div>
          <div v-if="book.description" class="notes">
            <p>{{ book.description }}</p>
          </div>
          <button @click="deleteBook(book.id)" class="delete-btn">削除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/reading.css"></style>
