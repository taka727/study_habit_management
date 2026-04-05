<script setup lang="ts">
import { taskData, selectWeek, renderBoard, addTask, editTask } from '../assets/script/taskManagerLogic.ts';
import { setActive } from '../assets/script/navigation.ts';
import { onMounted } from 'vue';

// 初期化
onMounted(() => {
  renderBoard();
});
</script>

<template>

  <body>
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
      <div class="week-selector">
        <h2>📅 週選択</h2>
        <div class="week-tabs">
          <button class="week-tab active" @click="selectWeek(1, $event)">Week 1</button>
          <button class="week-tab" @click="selectWeek(2, $event)">Week 2</button>
          <button class="week-tab" @click="selectWeek(3, $event)">Week 3</button>
          <button class="week-tab" @click="selectWeek(4, $event)">Week 4</button>
        </div>
      </div>
      <div class="board" id="taskBoard">
        <!-- タスクボードの内容はJSで動的生成 -->
      </div>
    </div>
  </body>
</template>
