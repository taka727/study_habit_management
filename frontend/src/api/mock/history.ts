// History.vue 用モックハンドラー (/history)

export interface StudyHistory {
  id: number
  date: string
  duration: number
  taskTitle: string
  category: string
}

const seed: StudyHistory[] = [
  { id: 1, date: '2024-09-01', duration: 60, taskTitle: '英単語帳（基本中）', category: 'english' },
  { id: 2, date: '2024-09-01', duration: 30, taskTitle: 'オンライン英会話', category: 'online' },
  { id: 3, date: '2024-09-02', duration: 50, taskTitle: '英語リスニング', category: 'listening' },
  { id: 4, date: '2024-09-03', duration: 20, taskTitle: '英単語帳（基本中）', category: 'english' },
]

let histories: StudyHistory[] = [...seed]
let nextId = seed.length + 1

export function handleHistory(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/history') {
    return { status: 'success', data: [...histories] }
  }

  if (method === 'POST' && url === '/history') {
    const { date, duration, taskTitle, category } = body as Omit<StudyHistory, 'id'>
    const history: StudyHistory = { id: nextId++, date, duration, taskTitle, category }
    histories.push(history)
    return { status: 'success', history }
  }

  const idMatch = url.match(/^\/history\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'GET') {
      const history = histories.find((h) => h.id === id)
      if (!history) return null
      return { status: 'success', data: history }
    }

    if (method === 'PUT') {
      const index = histories.findIndex((h) => h.id === id)
      if (index === -1) return null
      histories[index] = { ...histories[index], ...(body as Partial<StudyHistory>), id }
      return { status: 'success', history: histories[index] }
    }

    if (method === 'DELETE') {
      histories = histories.filter((h) => h.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
