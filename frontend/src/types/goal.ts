// 目標・マイルストーン型
// Milestone.vue / src/api/mock/goals.ts のインライン定義を移設したもの。

export interface Goal {
  id: number
  name: string
  description: string | null
  goal_deadline: string
}

/**
 * 目標作成・更新フォームで使用するペイロード型（POST/PUT /goals のリクエストボディ）。
 * Milestone.vue のフォーム状態と、mock/goals.ts のリクエストボディ取り出しに対応する。
 */
export interface GoalFormPayload {
  name: string
  description: string | null
  goal_deadline: string
}
