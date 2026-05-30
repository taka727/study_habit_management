// Milestone.vue 用モックハンドラー (/goals)

export interface Goal {
  id: number
  title: string
  description: string | null
  targetDate: string
  progress: number
}

const seed: Goal[] = [
  { id: 1, title: '英単語1000語達成', description: '基本英単語を1000語習得する', targetDate: '2024-10-31', progress: 65 },
  { id: 2, title: 'TOEIC 800点突破', description: 'TOEICスコア800点以上を目指す', targetDate: '2024-12-31', progress: 40 },
  { id: 3, title: '毎日学習100日達成', description: '連続100日間の学習習慣を確立する', targetDate: '2024-11-30', progress: 85 },
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
    const { title, description, targetDate, progress } = body as Omit<Goal, 'id'>
    const goal: Goal = { id: nextId++, title, description: description ?? null, targetDate, progress: progress ?? 0 }
    goals.push(goal)
    return { status: 'success', goal }
  }

  const idMatch = url.match(/^\/goals\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'GET') {
      const goal = goals.find((g) => g.id === id)
      if (!goal) return null
      return { status: 'success', data: goal }
    }

    if (method === 'PUT') {
      const index = goals.findIndex((g) => g.id === id)
      if (index === -1) return null
      goals[index] = { ...goals[index], ...(body as Partial<Goal>), id }
      return { status: 'success', goal: goals[index] }
    }

    if (method === 'DELETE') {
      goals = goals.filter((g) => g.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
