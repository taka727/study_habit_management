<script setup lang="ts">
import { ref } from 'vue';
const settings = ref({
  notifications: true,
  dailyGoal: 120,
  theme: 'light',
  language: 'ja'
});

function saveSettings() {
  alert('設定を保存しました');
}
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
      <div class="setting-group">
        <h3>通知設定</h3>
        <label class="setting-item">
          <input type="checkbox" v-model="settings.notifications">
          <span>学習リマインダーを有効にする</span>
        </label>
      </div>

      <div class="setting-group">
        <h3>学習目標</h3>
        <label class="setting-item">
          <span>1日の学習目標時間 (分):</span>
          <input type="number" v-model="settings.dailyGoal" min="10" max="480">
        </label>
      </div>

      <div class="setting-group">
        <h3>表示設定</h3>
        <label class="setting-item">
          <span>テーマ:</span>
          <select v-model="settings.theme">
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
          </select>
        </label>
      </div>

      <div class="setting-group">
        <h3>言語設定</h3>
        <label class="setting-item">
          <span>言語:</span>
          <select v-model="settings.language">
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      <button @click="saveSettings" class="save-btn">設定を保存</button>
    </div>
  </div>
</template>

<style scoped src="../assets/css/settings.css" ></style>
