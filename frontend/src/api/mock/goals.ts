// Milestone.vue 用モックハンドラー (/goals)

import type { ApiGoalMutationResponse, ApiListResponse, ApiMessageResponse, ApiMockResponse, Goal, GoalFormPayload } from '@/types'

const seed: Goal[] = [
  { id: 1, name: '英単語1000語達成', description: '基本英単語を1000語習得する', goal_deadline: '2024-10-31T00:00:00.000Z' },
  { id: 2, name: 'TOEIC 800点突破', description: 'TOEICスコア800点以上を目指す', goal_deadline: '2024-12-31T00:00:00.000Z' },
  { id: 3, name: '毎日学習100日達成', description: '連続100日間の学習習慣を確立する', goal_deadline: '2024-11-30T00:00:00.000Z' },
]

let goals: Goal[] = [...seed]
let nextId = seed.length + 1

export function handleGoals(
  method: string,
  url: string,
  body?: unknown,
): ApiMockResponse | null {
  if (method === 'GET' && url === '/goals') {
    const response: ApiListResponse<Goal> = { status: 'success', data: [...goals] }
    return response
  }

  if (method === 'POST' && url === '/goals') {
    const { name, description, goal_deadline } = body as GoalFormPayload
    const goal: Goal = { id: nextId++, name, description: description ?? null, goal_deadline }
    goals.push(goal)
    const response: ApiGoalMutationResponse<Goal> = { status: 'success', Goal: goal }
    return response
  }

  const idMatch = url.match(/^\/goals\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'PUT') {
      const index = goals.findIndex((g) => g.id === id)
      if (index === -1) return null
      const { name, description, goal_deadline } = body as Partial<GoalFormPayload>
      if (name !== undefined) goals[index].name = name
      if (description !== undefined) goals[index].description = description
      if (goal_deadline !== undefined) goals[index].goal_deadline = goal_deadline
      const response: ApiGoalMutationResponse<Goal> = { status: 'success', Goal: goals[index] }
      return response
    }

    if (method === 'DELETE') {
      goals = goals.filter((g) => g.id !== id)
      const response: ApiMessageResponse = { status: 'success' }
      return response
    }
  }

  return null
}
