<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiClient from '../api/client';

interface Milestone {
  id: number;
  title: string;
  target: string;
  progress: number;
  description: string;
}

const milestones = ref<Milestone[]>([]);

async function fetchMilestones() {
  try {
    const response = await apiClient.get<{ status: string; data: Milestone[] }>('/goals');
    milestones.value = response.data.data;
  } catch (error) {
    console.error('マイルストーンの取得に失敗しました', error);
  }
}

onMounted(fetchMilestones);
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

<style scoped src="../assets/css/milestone.css" ></style>
