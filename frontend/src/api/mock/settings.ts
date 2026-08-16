// Settings.vue 用モックハンドラー (/user)

import type { ApiItemResponse, ApiMockResponse, User, UserUpdatePayload } from '@/types'

const user: User = {
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
): ApiMockResponse | null {
  if (method === 'GET' && url === '/user') {
    const response: ApiItemResponse<User> = { status: 'success', data: { ...user } }
    return response
  }

  if (method === 'PUT' && url === '/user') {
    const { name, login_name } = body as UserUpdatePayload
    if (name) user.name = name
    if (login_name) user.login_name = login_name
    user.updated_at = new Date().toISOString()
    const response: ApiItemResponse<User> = { status: 'success', data: { ...user } }
    return response
  }

  return null
}
