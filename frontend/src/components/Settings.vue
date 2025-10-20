<script setup lang="ts">
import { ref } from 'vue';
import { setActive } from '../assets/script/navigation.ts';

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
        <li class="home"><router-link to="/" @click="setActive('home')">HOME</router-link></li>
        <li class="history"><router-link to="/history" @click="setActive('history')">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone" @click="setActive('milestone')">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading" @click="setActive('reading')">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings" class="active" @click="setActive('settings')">設定</router-link></li>
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

<style scoped>
.settings-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;padding: 20px;
  max-width: 600px;
}

.setting-group {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.setting-group h3 {
  margin-bottom: 15px;
  color: #333;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.setting-item input,
.setting-item select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.save-btn:hover {
  background: #45a049;
}
</style>
