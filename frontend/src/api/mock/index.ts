import type { ApiMockResponse } from '@/types'
import { handleBooks } from './books'
import { handleGoals } from './goals'
import { handleHistory } from './history'
import { handleSettings } from './settings'
import { handleTasks } from './tasks'

type Handler = (method: string, url: string, body?: unknown) => ApiMockResponse | null

const handlers: Handler[] = [
  handleBooks,
  handleTasks,
  handleGoals,
  handleHistory,
  handleSettings,
]

export function dispatch(
  method: string,
  url: string,
  body?: unknown,
): ApiMockResponse | null {
  for (const handler of handlers) {
    const result = handler(method, url, body)
    if (result !== null) return result
  }
  return null
}
