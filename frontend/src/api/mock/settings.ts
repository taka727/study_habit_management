// Settings.vue 用モックハンドラー (/user)

export interface User {
  id: number
  name: string
  login_name: string
  created_at: string
  updated_at: string
}

let user: User = {
  id: 1,
  name: 'テストユーザー',
  login_name: 'testuser',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
}

export function handleSettings(
  method: string,
  url: string,
  body?: unknown,
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/user') {
    return { status: 'success', data: { ...user } }
  }

  if (method === 'PUT' && url === '/user') {
    const { name, login_name } = body as { name?: string; login_name?: string }
    if (name) user.name = name
    if (login_name) user.login_name = login_name
    user.updated_at = new Date().toISOString()
    return { status: 'success', data: { ...user } }
  }

  return null
}
