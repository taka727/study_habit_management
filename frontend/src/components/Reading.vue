<script setup lang="ts">
import { ref } from 'vue';
import { setActive } from '../assets/script/navigation.ts';

const books = ref([
  { id: 1, title: "英語学習の科学", author: "田中博士", status: "読了", rating: 5, notes: "非常に参考になった。学習方法を見直すきっかけになった。" },
  { id: 2, title: "TOEIC攻略法", author: "佐藤先生", status: "読書中", rating: 0, notes: "第3章まで読了。具体的なテクニックが豊富。" },
  { id: 3, title: "English Grammar in Use", author: "Raymond Murphy", status: "予定", rating: 0, notes: "" }
]);

function addBook() {
  alert('新しい本を追加する機能を実装予定です');
}
</script>

<template>
  <div>
    <div class="header">
      <h1>📚 読書記録</h1>
      <p>学習に関連する書籍の記録を管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/" @click="setActive('home')">HOME</router-link></li>
        <li class="history"><router-link to="/history" @click="setActive('history')">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone" @click="setActive('milestone')">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading" class="active" @click="setActive('reading')">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings" @click="setActive('settings')">設定</router-link></li>
      </ul>
    </nav>
    <div class="reading-container">
      <button @click="addBook" class="add-book-btn">📖 新しい本を追加</button>
      <div class="book-grid">
        <div v-for="book in books" :key="book.id" class="book-card">
          <div class="book-header">
            <h3>{{ book.title }}</h3>
            <span class="status-badge" :class="book.status">{{ book.status }}</span>
          </div>
          <p class="author">著者: {{ book.author }}</p>
          <div v-if="book.rating > 0" class="rating">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= book.rating }">⭐</span>
          </div>
          <div v-if="book.notes" class="notes">
            <h4>メモ:</h4>
            <p>{{ book.notes }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/reading.css" />
