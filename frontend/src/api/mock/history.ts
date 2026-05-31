// History.vue 用モックハンドラー (/history)

export interface StudyHistory {
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

const seed: StudyHistory[] = [
  {
    id: 1, user_id: 1, task_id: 1, description: '英単語帳（基本中）の復習',
    occurred_on: '2024-09-01', started_at: '2024-09-01T09:00:00', ended_at: '2024-09-01T09:20:00',
    duration_seconds: 1200, created_at: '2024-09-01T09:20:00', updated_at: '2024-09-01T09:20:00', deleted_at: null,
  },
  {
    id: 2, user_id: 1, task_id: 2, description: 'オンライン英会話 実践トレーニング',
    occurred_on: '2024-09-01', started_at: '2024-09-01T10:00:00', ended_at: '2024-09-01T10:30:00',
    duration_seconds: 1800, created_at: '2024-09-01T10:30:00', updated_at: '2024-09-01T10:30:00', deleted_at: null,
  },
  {
    id: 3, user_id: 1, task_id: 3, description: '英語リスニング練習',
    occurred_on: '2024-09-02', started_at: '2024-09-02T09:00:00', ended_at: '2024-09-02T09:50:00',
    duration_seconds: 3000, created_at: '2024-09-02T09:50:00', updated_at: '2024-09-02T09:50:00', deleted_at: null,
  },
  {
    id: 4, user_id: 1, task_id: 1, description: '英単語帳 復習',
    occurred_on: '2024-09-02', started_at: '2024-09-02T10:00:00', ended_at: '2024-09-02T10:20:00',
    duration_seconds: 1200, created_at: '2024-09-02T10:20:00', updated_at: '2024-09-02T10:20:00', deleted_at: null,
  },
  {
    id: 5, user_id: 1, task_id: 1, description: '英単語帳（基本中）',
    occurred_on: '2024-09-03', started_at: '2024-09-03T09:00:00', ended_at: '2024-09-03T09:20:00',
    duration_seconds: 1200, created_at: '2024-09-03T09:20:00', updated_at: '2024-09-03T09:20:00', deleted_at: null,
  },
  {
    id: 6, user_id: 1, task_id: 2, description: 'オンライン英会話',
    occurred_on: '2024-09-04', started_at: '2024-09-04T09:00:00', ended_at: '2024-09-04T09:30:00',
    duration_seconds: 1800, created_at: '2024-09-04T09:30:00', updated_at: '2024-09-04T09:30:00', deleted_at: null,
  },
  {
    id: 7, user_id: 1, task_id: null, description: '自習',
    occurred_on: '2024-09-05', started_at: '2024-09-05T09:00:00', ended_at: '2024-09-05T09:20:00',
    duration_seconds: 1200, created_at: '2024-09-05T09:20:00', updated_at: '2024-09-05T09:20:00', deleted_at: null,
  },
]

let histories: StudyHistory[] = [...seed]
let nextId = seed.length + 1

export function handleHistory(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  const baseMatch = url === '/history' || url.startsWith('/history?')

  if (method === 'GET' && baseMatch) {
    const queryStr = url.includes('?') ? url.split('?')[1] : ''
    const params = new URLSearchParams(queryStr)
    const from = params.get('from')
    const to = params.get('to')

    let result = [...histories]
    if (from) result = result.filter((h) => h.occurred_on >= from)
    if (to) result = result.filter((h) => h.occurred_on <= to)

    return { status: 'success', data: result }
  }

  if (method === 'POST' && url === '/history') {
    const { task_id, description, occurred_on, started_at, ended_at, duration_seconds } =
      body as Omit<StudyHistory, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'deleted_at'>
    const now = new Date().toISOString()
    const history: StudyHistory = {
      id: nextId++, user_id: 1, task_id: task_id ?? null,
      description: description ?? null, occurred_on, started_at: started_at ?? null,
      ended_at: ended_at ?? null, duration_seconds: duration_seconds ?? null,
      created_at: now, updated_at: now, deleted_at: null,
    }
    histories.push(history)
    return { status: 'success', data: history }
  }

  const idMatch = url.match(/^\/history\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'PUT') {
      const index = histories.findIndex((h) => h.id === id)
      if (index === -1) return null
      histories[index] = { ...histories[index], ...(body as Partial<StudyHistory>), id }
      return { status: 'success', data: histories[index] }
    }

    if (method === 'DELETE') {
      histories = histories.filter((h) => h.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
