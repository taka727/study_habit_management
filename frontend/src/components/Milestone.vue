<script setup lang="ts">
import { ref } from 'vue';
import { setActive } from '../assets/script/navigation.ts';

const milestones = ref([
  { id: 1, title: "英単語1000語達成", target: "2024年10月末", progress: 65, description: "基本英単語を1000語習得する" },
  { id: 2, title: "TOEIC 800点突破", target: "2024年12月", progress: 40, description: "TOEICスコア800点以上を目指す" },
  { id: 3, title: "毎日学習100日達成", target: "2024年11月", progress: 85, description: "連続100日間の学習習慣を確立する" }
]);
</script>

<template>
  <div>
    <div class="header">
      <h1>🎯 マイルストーン</h1>
      <p>学習目標の進捗を管理しましょう</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/" @click="setActive('home')">HOME</router-link></li>
        <li class="history"><router-link to="/history" @click="setActive('history')">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone" class="active" @click="setActive('milestone')">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading" @click="setActive('reading')">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings" @click="setActive('settings')">設定</router-link></li>
      </ul>
    </nav>
    <div class="milestone-container">
      <div v-for="milestone in milestones" :key="milestone.id" class="milestone-card">
        <div class="milestone-header">
          <h3>{{ milestone.title }}</h3>
          <span class="target-date">目標: {{ milestone.target }}</span>
        </div>
        <p class="description">{{ milestone.description }}</p>
        <div class="progress-section">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: milestone.progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ milestone.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.milestone-container {
    max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  display: grid;
  gap: 20px;
}

.milestone-card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.target-date {
  color: #666;
  font-size: 14px;
}

.description {
  color: #555;
  margin-bottom: 15px;
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: bold;
  color: #4CAF50;
}
</style>
