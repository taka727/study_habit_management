// ユーザー・認証型
//
// バックエンドのユーザー／認証スキーマは未確定のため、最小構成に留める。
// 認証は Bearer トークン（localStorage の `token`）のみで、セッション情報等の型は
// 仕様確定後に拡張する前提とする。
//
// Settings.vue / src/api/mock/settings.ts のインライン定義を移設したもの。

export interface User {
  id: number
  name: string
  login_name: string
  created_at: string
  updated_at: string
}

/**
 * ユーザー設定更新フォームで使用するペイロード型（PUT /user のリクエストボディ）。
 * Settings.vue のフォーム状態と、mock/settings.ts のリクエストボディ取り出しに対応する。
 */
export interface UserUpdatePayload {
  name?: string
  login_name?: string
}

/**
 * 認証トークン（localStorage の `token`）を表す最小型。
 * バックエンドの認証仕様確定後、有効期限やリフレッシュトークン等を含む型へ拡張する想定。
 */
export type AuthToken = string
