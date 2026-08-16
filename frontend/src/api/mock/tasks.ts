// TaskManager.vue 用モックハンドラー (/tasks)

import type { ApiItemResponse, ApiListResponse, ApiMessageResponse, ApiMockResponse, Task, TaskFormPayload } from '@/types'

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
): ApiMockResponse | null {
  if (method === 'GET' && url === '/tasks') {
    const response: ApiListResponse<Task> = { status: 'success', data: [...tasks], count: tasks.length }
    return response
  }

  if (method === 'POST' && url === '/tasks') {
    const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } =
      body as TaskFormPayload
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
    const response: ApiItemResponse<Task> = { status: 'success', data: task }
    return response
  }

  const idMatch = url.match(/^\/tasks\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'GET') {
      const task = tasks.find((t) => t.id === id)
      if (!task) return null
      const response: ApiItemResponse<Task> = { status: 'success', data: task }
      return response
    }

    if (method === 'PUT') {
      const index = tasks.findIndex((t) => t.id === id)
      if (index === -1) return null
      const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } =
        body as Partial<TaskFormPayload>
      if (taskTitle !== undefined) tasks[index].name = taskTitle
      if (taskDescription !== undefined) tasks[index].description = taskDescription
      if (taskStatusId !== undefined) tasks[index].status = taskStatusId
      if (taskStartTime !== undefined) tasks[index].exec_expected_date = new Date(taskStartTime).toISOString()
      if (taskEndTime !== undefined) tasks[index].deadline = new Date(taskEndTime).toISOString()
      tasks[index].updated_at = new Date().toISOString()
      const response: ApiItemResponse<Task> = { status: 'success', data: tasks[index] }
      return response
    }

    if (method === 'DELETE') {
      tasks = tasks.filter((t) => t.id !== id)
      const response: ApiMessageResponse = { status: 'success', message: 'タスクが削除されました' }
      return response
    }
  }

  return null
}
