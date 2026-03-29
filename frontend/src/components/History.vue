<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import { taskData } from '../assets/script/taskManagerLogic';
import { setActive } from '../assets/script/navigation.ts';

Chart.register(...registerables);

const historyData = ref(taskData);
const chartInstances = ref<{ [key: string]: Chart }>({});

const calculateWeekAchievement = (week: any) => {
  let totalCompleted = 0;
  let totalTarget = 0;

  Object.values(week).forEach((day: any) => {
    const completed = day.tasks.reduce((sum: number, task: any) => sum + task.duration, 0);
    totalCompleted += completed;
    totalTarget += day.total;
  });

  const achievementRate = totalTarget > 0 ? (totalCompleted / totalTarget) * 100 : 0;
  return {
    completed: totalCompleted,
    target: totalTarget,
    achievementRate: Math.round(achievementRate),
    remaining: Math.max(0, totalTarget - totalCompleted)
  };
};

const getDailyData = (week: any) => {
  const days = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];
  const completedData: number[] = [];
  const targetData: number[] = [];

  days.forEach(day => {
    if (Object.keys(week).some(key => key.includes(day[0]))) {
      const weekdayKey = Object.keys(week).find(key => key.includes(day[0]));
      if (weekdayKey === undefined) return;
      const completed = week[weekdayKey].tasks.reduce((sum: number, task: any) => sum + task.duration, 0);
      completedData.push(completed);
      targetData.push(week[weekdayKey].total);
    } else {
      completedData.push(0);
      targetData.push(0);
    }
  });

  return { days, completedData, targetData };
};

const createPieChart = (canvasId: string, weekData: any) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const achievement = calculateWeekAchievement(weekData);

  if (chartInstances.value[canvasId]) {
    chartInstances.value[canvasId].destroy();
  }

  chartInstances.value[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['達成', '未達成'],
      datasets: [{
        data: [achievement.completed, achievement.remaining],
        backgroundColor: [
          '#4CAF50',
          '#E0E0E0'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 10,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed;
              return `${label}: ${value}分`;
            }
          }
        }
      },
      cutout: '60%'
    }
  });
};

const createBarChart = (canvasId: string, weekData: any) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dailyData = getDailyData(weekData);

  if (chartInstances.value[canvasId]) {
    chartInstances.value[canvasId].destroy();
  }

  chartInstances.value[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dailyData.days,
      datasets: [
        {
          label: '実際の学習時間',
          data: dailyData.completedData,
          backgroundColor: '#2196F3',
          borderColor: '#1976D2',
          borderWidth: 1
        },
        {
          label: '目標時間',
          data: dailyData.targetData,
          backgroundColor: '#FF9800',
          borderColor: '#F57C00',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '時間（分）'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            padding: 20,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.y}分`;
            }
          }
        }
      }
    }
  });
};

const cleanup = () => {
  Object.values(chartInstances.value).forEach(chart => {
    chart.destroy();
  });
  chartInstances.value = {};
};

let timerId : ReturnType<typeof setTimeout>;

onMounted(async () => {
  await nextTick();

  Object.keys(historyData.value).forEach(weekKey => {
    const pieChartId = `pie-chart-${weekKey}`;
    const barChartId = `bar-chart-${weekKey}`;
    timerId = setTimeout(() => {
      createPieChart(pieChartId, historyData.value[weekKey]);
      createBarChart(barChartId, historyData.value[weekKey]);
    }, 100);
  });
});

onBeforeUnmount(() => {
  clearTimeout(timerId);
  cleanup();
});

</script>

<template>
  <div>
    <div class="header">
      <h1>📈 学習ヒストリー</h1>
      <p>過去の学習記録を確認できます</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/" @click="setActive('home')">HOME</router-link></li>
        <li class="history"><router-link to="/history" class="active" @click="setActive('history')">ヒストリー</router-link>
        </li>
        <li class="milestone"><router-link to="/milestone" @click="setActive('milestone')">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading" @click="setActive('reading')">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings" @click="setActive('settings')">設定</router-link></li>
      </ul>
    </nav>
    <div class="history-container">
      <details v-for="(week, weekKey) in historyData" :key="weekKey" class="week-history">
        <summary class="week-header">
          <div class="week-title">{{ String(weekKey).toUpperCase() }}</div>
          <div class="week-summary">
            <span class="achievement-badge" :class="{
              'high': calculateWeekAchievement(week).achievementRate >= 80,
              'medium': calculateWeekAchievement(week).achievementRate >= 60,
              'low': calculateWeekAchievement(week).achievementRate < 60
            }">
              {{ calculateWeekAchievement(week).achievementRate }}% 達成
            </span>
          </div>
        </summary>
        <!-- グラフエリア -->
        <div class="charts-container">
          <div class="chart-section">
            <h4>📊 週間達成率</h4>
            <div class="chart-wrapper">
              <canvas :id="`pie-chart-${weekKey}`"></canvas>
              <div class="chart-center-text">
                <div class="percentage">{{ calculateWeekAchievement(week).achievementRate }}%</div>
                <div class="label">達成率</div>
              </div>
            </div>
            <div class="chart-stats">
              <div class="stat-item">
                <span class="stat-label">完了時間:</span>
                <span class="stat-value">{{ calculateWeekAchievement(week).completed }}分</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">目標時間:</span>
                <span class="stat-value">{{ calculateWeekAchievement(week).target }}分</span>
              </div>
            </div>
          </div>

          <div class="chart-section">
            <h4>📅 曜日別学習時間</h4>
            <div class="chart-wrapper">
              <canvas :id="`bar-chart-${weekKey}`"></canvas>
            </div>
          </div>
        </div>
        <!-- 従来の日別サマリー -->
        <div class="day-grid">
          <div v-for="(day, dayKey) in week" :key="dayKey" class="day-summary">
            <h5>{{ dayKey }}</h5>
            <div class="stats">
              <p>完了: {{day.tasks.reduce((sum, task) => sum + task.duration, 0)}}分</p>
              <p>目標: {{ day.total }}分</p>
              <p class="achievement-rate">
                達成率: {{Math.round((day.tasks.reduce((sum, task) => sum + task.duration, 0) / day.total) * 100)}}%
              </p>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<style scoped src="../assets/css/history.css"></style>
