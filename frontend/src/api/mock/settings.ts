// Settings.vue 用モックハンドラー (/user)

export interface UserSettings {
  id: number
  name: string
  email: string
  notifications: boolean
  dailyGoal: number
  theme: 'light' | 'dark'
  language: 'ja' | 'en'
}

let userSettings: UserSettings = {
  id: 1,
  name: 'テストユーザー',
  email: 'test@example.com',
  notifications: true,
  dailyGoal: 120,
  theme: 'light',
  language: 'ja',
}

export function handleSettings(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/user') {
    return { status: 'success', data: { ...userSettings } }
  }

  if (method === 'PUT' && url === '/user') {
    userSettings = { ...userSettings, ...(body as Partial<UserSettings>) }
    return { status: 'success', data: { ...userSettings } }
  }

  return null
}
