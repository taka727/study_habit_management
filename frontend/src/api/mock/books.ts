// Reading.vue 用モックハンドラー (/books)

export interface Book {
  id: number
  title: string
  description: string | null
}

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
): Record<string, unknown> | null {
  if (method === 'GET' && url === '/books') {
    return { status: 'success', data: [...books] }
  }

  if (method === 'POST' && url === '/books') {
    const { title, description } = body as { title: string; description: string | null }
    const book: Book = { id: nextId++, title, description: description ?? null }
    books.push(book)
    return { status: 'success', book }
  }

  const idMatch = url.match(/^\/books\/(\d+)$/)
  if (idMatch) {
    const id = Number(idMatch[1])

    if (method === 'PUT') {
      const index = books.findIndex((b) => b.id === id)
      if (index === -1) return null
      const { title, description } = body as { title: string; description: string | null }
      books[index] = { id, title, description: description ?? null }
      return { status: 'success', book: books[index] }
    }

    if (method === 'DELETE') {
      books = books.filter((b) => b.id !== id)
      return { status: 'success' }
    }
  }

  return null
}
