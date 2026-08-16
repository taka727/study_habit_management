// タスク・サブタスク型
// TaskManager.vue / src/api/mock/tasks.ts のインライン定義を移設したもの。

/** タスクのステータス（リテラルユニオン） */
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface Task {
  id: number
  user_id: number | null
  /** サブタスクの場合、親タスクのID。トップレベルタスクは null */
  parent_task_id: number | null
  name: string
  description: string | null
  schedule_date: string | null
  exec_expected_date: string | null
  deadline: string | null
  status: TaskStatus
  duration_seconds: number | null
  category: string | null
  comment: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

/**
 * タスク作成・更新フォームで使用するペイロード型（POST/PUT /tasks のリクエストボディ）。
 * TaskManager.vue のフォーム状態と、mock/tasks.ts のリクエストボディ取り出しに対応する。
 */
export interface TaskFormPayload {
  taskTitle: string
  taskDescription: string
  taskStatusId?: TaskStatus
  taskStartTime?: string
  taskEndTime?: string
}
