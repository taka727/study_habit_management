// Milestone.vue 用モックハンドラー (/goals)

export interface Goal {
  id: number
  name: string
  description: string | null
  goal_deadline: string
}

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
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/goals') {
    return { status: 'success', data: [...goals] }
  }

  if (method === 'POST' && url === '/goals') {
    const { name, description, goal_deadline } = body as Omit<Goal, 'id'>
    const goal: Goal = { id: nextId++, name, description: description ?? null, goal_deadline }
    goals.push(goal)
    return { status: 'success', Goal: goal }
  }

  const idMatch = url.match(/^\/goals\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'PUT') {
      const index = goals.findIndex((g) => g.id === id)
      if (index === -1) return null
      const { name, description, goal_deadline } = body as Partial<Goal>
      if (name !== undefined) goals[index].name = name
      if (description !== undefined) goals[index].description = description
      if (goal_deadline !== undefined) goals[index].goal_deadline = goal_deadline
      return { status: 'success', Goal: goals[index] }
    }

    if (method === 'DELETE') {
      goals = goals.filter((g) => g.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
