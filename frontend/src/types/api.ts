// APIレスポンス共通型
//
// 実際の封筒（レスポンス本体）は以下の形をとる。
//   - 一覧取得: { status: 'success', data: T[], count?: number }
//   - 単体取得・更新: { status: 'success', data: T }
//   - 削除: { status: 'success', message?: string }
//
// 【既知の技術的負債】POST/PUT のペイロードキーはエンドポイントごとに不統一。
//   - /tasks (POST/PUT): `data` キー          → ApiItemResponse<Task> と同形
//   - /goals (POST/PUT): `Goal` キー（大文字始まり） → ApiGoalMutationResponse<Goal>
//   - /books (POST/PUT): `book` キー（小文字）       → ApiBookMutationResponse<Book>
// 本Issueではこの不統一を型で無理に吸収せず、実態をそのまま型として表現するに留める。
// キーの統一は別Issueのスコープとする。

export type ApiStatus = 'success'

/** 一覧取得系のレスポンス封筒（例: GET /tasks, GET /goals, GET /books, GET /history） */
export interface ApiListResponse<T> {
  status: ApiStatus
  data: T[]
  count?: number
}

/** 単体取得・更新系のレスポンス封筒（例: GET /tasks/:id, PUT /tasks/:id, GET /user） */
export interface ApiItemResponse<T> {
  status: ApiStatus
  data: T
}

/** 削除系など、データ本体を含まないレスポンス封筒 */
export interface ApiMessageResponse {
  status: ApiStatus
  message?: string
}

/**
 * goals の POST/PUT レスポンス封筒。
 * 本来は `data` キーであるべきだが、実装上 `Goal`（大文字始まり）キーになっている（既知の技術的負債）。
 */
export interface ApiGoalMutationResponse<T> {
  status: ApiStatus
  Goal: T
}

/**
 * books の POST/PUT レスポンス封筒。
 * 本来は `data` キーであるべきだが、実装上 `book`（小文字）キーになっている（既知の技術的負債）。
 */
export interface ApiBookMutationResponse<T> {
  status: ApiStatus
  book: T
}

/**
 * モックハンドラー（`src/api/mock/*.ts`）が返しうるレスポンス封筒の合併型。
 * 各エンドポイントの封筒キー不統一（本ファイル冒頭のコメント参照）をそのまま型に反映している。
 */
export type ApiMockResponse =
  | ApiListResponse<unknown>
  | ApiItemResponse<unknown>
  | ApiMessageResponse
  | ApiGoalMutationResponse<unknown>
  | ApiBookMutationResponse<unknown>
