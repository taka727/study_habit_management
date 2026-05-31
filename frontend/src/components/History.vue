<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import apiClient from '../api/client'

Chart.register(...registerables)

interface StudyHistory {
  id: number
  user_id: number | null
  task_id: number | null
  description: string | null
  occurred_on: string
  started_at: string | null
  ended_at: string | null
  duration_seconds: number | null
  created_at: string
  updated_at: string
  deleted_at: null
}

const histories = ref<StudyHistory[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const fromDate = ref('')
const toDate = ref('')
const chartInstance = ref<Chart | null>(null)

function toMinutes(seconds: number | null): number {
  return seconds ? Math.round(seconds / 60) : 0
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ja-JP', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  })
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
}

const historiesByDate = computed(() => {
  const grouped: Record<string, StudyHistory[]> = {}
  for (const h of histories.value) {
    const key = h.occurred_on.slice(0, 10)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(h)
  }
  return grouped
})

const sortedDates = computed(() => Object.keys(historiesByDate.value).sort())

const totalMinutes = computed(() =>
  histories.value.reduce((sum, h) => sum + toMinutes(h.duration_seconds), 0),
)

function dailyMinutes(records: StudyHistory[]): number {
  return records.reduce((sum, r) => sum + toMinutes(r.duration_seconds), 0)
}

async function fetchHistories() {
  isLoading.value = true
  error.value = null
  try {
    const params = new URLSearchParams()
    if (fromDate.value) params.append('from', fromDate.value)
    if (toDate.value) params.append('to', toDate.value)
    const query = params.toString()
    const response = await apiClient.get<{ status: string; data: StudyHistory[] }>(
      `/history${query ? '?' + query : ''}`,
    )
    histories.value = response.data.data
    await nextTick()
    renderChart()
  } catch {
    error.value = '履歴の取得に失敗しました'
  } finally {
    isLoading.value = false
  }
}

function renderChart() {
  const canvas = document.getElementById('daily-bar-chart') as HTMLCanvasElement
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  if (chartInstance.value) chartInstance.value.destroy()

  const labels = sortedDates.value.map(formatDate)
  const data = sortedDates.value.map((d) => dailyMinutes(historiesByDate.value[d]))

  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '学習時間（分）',
          data,
          backgroundColor: '#2196F3',
          borderColor: '#1976D2',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: '時間（分）' },
        },
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.y}分`,
          },
        },
      },
    },
  })
}

onMounted(fetchHistories)

onBeforeUnmount(() => {
  chartInstance.value?.destroy()
})
</script>

<template>
  <div>
    <div class="header">
      <h1>📈 学習ヒストリー</h1>
      <p>過去の学習記録を確認できます</p>
    </div>
    <nav>
      <ul>
        <li class="home"><router-link to="/">HOME</router-link></li>
        <li class="history"><router-link to="/history" class="active">ヒストリー</router-link></li>
        <li class="milestone"><router-link to="/milestone">マイルストーン</router-link></li>
        <li class="reading"><router-link to="/reading">読書記録</router-link></li>
        <li class="settings"><router-link to="/settings">設定</router-link></li>
      </ul>
    </nav>

    <div class="history-container">
      <div class="filter-bar">
        <label>
          <span>開始日</span>
          <input type="date" v-model="fromDate" />
        </label>
        <label>
          <span>終了日</span>
          <input type="date" v-model="toDate" />
        </label>
        <button @click="fetchHistories" class="search-btn">検索</button>
      </div>

      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isLoading">読み込み中...</p>

      <template v-else-if="histories.length > 0">
        <div class="summary-bar">
          <span>合計 {{ sortedDates.length }} 日 ／ {{ totalMinutes }} 分</span>
        </div>

        <div class="chart-section">
          <h3>📊 日別学習時間</h3>
          <div class="chart-wrapper">
            <canvas id="daily-bar-chart"></canvas>
          </div>
        </div>

        <div class="day-list">
          <details
            v-for="date in sortedDates"
            :key="date"
            class="day-block"
            open
          >
            <summary class="day-header">
              <span class="day-label">{{ formatDate(date) }}</span>
              <span class="day-total">{{ dailyMinutes(historiesByDate[date]) }} 分</span>
            </summary>
            <div class="record-list">
              <div
                v-for="record in historiesByDate[date]"
                :key="record.id"
                class="record-card"
              >
                <div class="record-desc">{{ record.description ?? '（説明なし）' }}</div>
                <div class="record-meta">
                  <span>{{ formatTime(record.started_at) }} 〜 {{ formatTime(record.ended_at) }}</span>
                  <span class="record-duration">{{ toMinutes(record.duration_seconds) }} 分</span>
                </div>
              </div>
            </div>
          </details>
        </div>
      </template>

      <p v-else>履歴がありません。</p>
    </div>
  </div>
</template>

<style scoped src="../assets/css/history.css"></style>
