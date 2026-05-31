// TaskManager.vue 用モックハンドラー (/tasks)

export interface Task {
  id: number
  user_id: number | null
  parent_task_id: number | null
  name: string
  description: string | null
  schedule_date: string | null
  exec_expected_date: string | null
  deadline: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  duration_seconds: number | null
  category: string | null
  comment: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

const now = new Date().toISOString()

const seed: Task[] = [
  {
    id: 1, user_id: 1, parent_task_id: null, name: '英単語100語暗記',
    description: '基本英単語の復習と定着', schedule_date: null,
    exec_expected_date: '2024-09-01T00:00:00.000Z', deadline: '2024-09-07T00:00:00.000Z',
    status: 'IN_PROGRESS', duration_seconds: null, category: 'english', comment: null,
    created_at: now, updated_at: now, deleted_at: null,
  },
  {
    id: 2, user_id: 1, parent_task_id: null, name: 'オンライン英会話',
    description: null, schedule_date: null,
    exec_expected_date: '2024-09-02T00:00:00.000Z', deadline: '2024-09-08T00:00:00.000Z',
    status: 'TODO', duration_seconds: null, category: 'online', comment: null,
    created_at: now, updated_at: now, deleted_at: null,
  },
  {
    id: 3, user_id: 1, parent_task_id: null, name: 'リスニング練習',
    description: '30分のポッドキャストを聞く', schedule_date: null,
    exec_expected_date: '2024-09-01T00:00:00.000Z', deadline: '2024-09-05T00:00:00.000Z',
    status: 'COMPLETED', duration_seconds: 1800, category: 'listening', comment: null,
    created_at: now, updated_at: now, deleted_at: null,
  },
]

let tasks: Task[] = [...seed]
let nextId = seed.length + 1

export function handleTasks(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/tasks') {
    return { status: 'success', data: [...tasks], count: tasks.length }
  }

  if (method === 'POST' && url === '/tasks') {
    const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } =
      body as { taskTitle: string; taskDescription: string; taskStatusId?: string; taskStartTime?: string; taskEndTime?: string }
    const task: Task = {
      id: nextId++, user_id: 1, parent_task_id: null,
      name: taskTitle, description: taskDescription ?? null,
      schedule_date: null,
      exec_expected_date: taskStartTime ? new Date(taskStartTime).toISOString() : null,
      deadline: taskEndTime ? new Date(taskEndTime).toISOString() : null,
      status: (taskStatusId ?? 'TODO') as Task['status'],
      duration_seconds: null, category: null, comment: null,
      created_at: now, updated_at: now, deleted_at: null,
    }
    tasks.push(task)
    return { status: 'success', data: task }
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
      const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } =
        body as { taskTitle?: string; taskDescription?: string; taskStatusId?: string; taskStartTime?: string; taskEndTime?: string }
      if (taskTitle !== undefined) tasks[index].name = taskTitle
      if (taskDescription !== undefined) tasks[index].description = taskDescription
      if (taskStatusId !== undefined) tasks[index].status = taskStatusId as Task['status']
      if (taskStartTime !== undefined) tasks[index].exec_expected_date = new Date(taskStartTime).toISOString()
      if (taskEndTime !== undefined) tasks[index].deadline = new Date(taskEndTime).toISOString()
      tasks[index].updated_at = new Date().toISOString()
      return { status: 'success', data: tasks[index] }
    }

    if (method === 'DELETE') {
      tasks = tasks.filter((t) => t.id !== id)
      return { status: 'success', message: 'タスクが削除されました' }
    }
  }

  return null
}
