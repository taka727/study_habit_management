import { handleBooks } from './books'
import { handleGoals } from './goals'
import { handleHistory } from './history'
import { handleSettings } from './settings'
import { handleTasks } from './tasks'

type Handler = (method: string, url: string, body?: unknown) => Record<string, unknown> | null

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
): Record<string, unknown> | null {
  for (const handler of handlers) {
    const result = handler(method, url, body)
    if (result !== null) return result
  }
  return null
}
