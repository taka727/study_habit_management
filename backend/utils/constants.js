/**
 * HTTPステータスコード定数
 */
const HTTP_STATUS = {
  // 成功
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // クライアントエラー
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // サーバーエラー
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};

/**
 * エラーメッセージ定数
 */
const ERROR_MESSAGES = {
  // 認証関連
  TOKEN_REQUIRED: 'アクセストークンが必要です',
  TOKEN_INVALID: '無効なトークンです',
  TOKEN_EXPIRED: 'トークンの有効期限が切れています',
  USER_NOT_FOUND: 'ユーザーが見つかりません',
  UNAUTHORIZED: '認証が必要です',
  FORBIDDEN: 'アクセス権限がありません',
  ADMIN_REQUIRED: '管理者権限が必要です',

  // バリデーション関連
  VALIDATION_ERROR: 'バリデーションエラーが発生しました',
  REQUIRED_FIELD: 'は必須項目です',
  INVALID_FORMAT: 'の形式が正しくありません',

  // データベース関連
  RESOURCE_NOT_FOUND: 'リソースが見つかりません',
  DUPLICATE_ENTRY: 'すでに存在するデータです',
  DATABASE_ERROR: 'データベースエラーが発生しました',

  // 一般的なエラー
  INTERNAL_ERROR: '内部サーバーエラーが発生しました',
  BAD_REQUEST: '不正なリクエストです'
};

module.exports = {
  HTTP_STATUS,
  ERROR_MESSAGES
};
