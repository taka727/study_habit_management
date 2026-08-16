// Reading.vue 用モックハンドラー (/books)

import type { ApiBookMutationResponse, ApiListResponse, ApiMessageResponse, ApiMockResponse, Book, BookFormPayload } from '@/types'

const seed: Book[] = [
  { id: 1, title: 'JavaScript完全ガイド', description: 'JavaScriptの基礎から応用まで丁寧に解説' },
  { id: 2, title: 'TypeScriptハンドブック', description: 'TypeScriptの型システムを実践的に学ぶ' },
  { id: 3, title: 'Vue.js設計パターン', description: null },
]

let books: Book[] = [...seed]
let nextId = seed.length + 1

export function handleBooks(
  method: string,
  url: string,
  body?: unknown,
): ApiMockResponse | null {
  if (method === 'GET' && url === '/books') {
    const response: ApiListResponse<Book> = { status: 'success', data: [...books] }
    return response
  }

  if (method === 'POST' && url === '/books') {
    const { title, description } = body as BookFormPayload
    const book: Book = { id: nextId++, title, description: description ?? null }
    books.push(book)
    const response: ApiBookMutationResponse<Book> = { status: 'success', book }
    return response
  }

  const idMatch = url.match(/^\/books\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'PUT') {
      const index = books.findIndex((b) => b.id === id)
      if (index === -1) return null
      const { title, description } = body as BookFormPayload
      books[index] = { id, title, description: description ?? null }
      const response: ApiBookMutationResponse<Book> = { status: 'success', book: books[index] }
      return response
    }

    if (method === 'DELETE') {
      books = books.filter((b) => b.id !== id)
      const response: ApiMessageResponse = { status: 'success' }
      return response
    }
  }

  return null
}
