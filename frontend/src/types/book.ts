// 書籍型
// Reading.vue / src/api/mock/books.ts のインライン定義を移設したもの。

export interface Book {
  id: number
  title: string
  description: string | null
}

/**
 * 書籍登録・更新フォームで使用するペイロード型（POST/PUT /books のリクエストボディ）。
 * Reading.vue のフォーム状態と、mock/books.ts のリクエストボディ取り出しに対応する。
 */
export interface BookFormPayload {
  title: string
  description: string | null
}
