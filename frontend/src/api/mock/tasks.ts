// TaskManager.vue 用モックハンドラー (/tasks)

export interface Task {
  id: number
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  description: string | null
}

const seed: Task[] = [
  { id: 1, title: '英単語100語暗記', status: 'IN_PROGRESS', description: '基本英単語の復習' },
  { id: 2, title: 'オンライン英会話', status: 'TODO', description: null },
  { id: 3, title: 'リスニング練習', status: 'COMPLETED', description: '30分のポッドキャスト' },
]

let tasks: Task[] = [...seed]
let nextId = seed.length + 1

export function handleTasks(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/tasks') {
    return { status: 'success', data: [...tasks] }
  }

  if (method === 'POST' && url === '/tasks') {
    const { title, status, description } = body as Omit<Task, 'id'>
    const task: Task = { id: nextId++, title, status: status ?? 'TODO', description: description ?? null }
    tasks.push(task)
    return { status: 'success', task }
  }

  const idMatch = url.match(/^\/tasks\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'GET') {
      const task = tasks.find((t) => t.id === id)
      if (!task) return null
      return { status: 'success', data: task }
    }

    if (method === 'PUT') {
      const index = tasks.findIndex((t) => t.id === id)
      if (index === -1) return null
      tasks[index] = { ...tasks[index], ...(body as Partial<Task>), id }
      return { status: 'success', task: tasks[index] }
    }

    if (method === 'DELETE') {
      tasks = tasks.filter((t) => t.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
