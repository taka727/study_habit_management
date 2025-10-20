/**
 * APIレスポンス統一ユーティリティ
 */

/**
 * 成功レスポンスを返す
 * @param {object} res - Expressのresponseオブジェクト
 * @param {any} data - レスポンスデータ
 * @param {string} message - 成功メッセージ
 * @param {number} status - HTTPステータスコード（デフォルト: 200）
 */
const sendSuccessResponse = (res, data = null, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: data,
    timestamp: new Date().toISOString()
  });
};

/**
 * エラーレスポンスを返す
 * @param {object} res - Expressのresponseオブジェクト
 * @param {number} status - HTTPステータスコード
 * @param {string} message - エラーメッセージ
 * @param {any} details - エラー詳細（開発環境でのみ含める）
 */
const sendErrorResponse = (res, status, message, details = null) => {
  const response = {
    success: false,
    error: true,
    message: message,
    code: status,
    timestamp: new Date().toISOString()
  };

  // 開発環境でのみエラー詳細を含める
  if (process.env.NODE_ENV === 'development' && details) {
    response.details = details;
  }

  return res.status(status).json(response);
};

/**
 * バリデーションエラーレスポンスを返す
 * @param {object} res - Expressのresponseオブジェクト
 * @param {array} errors - バリデーションエラーの配列
 */
const sendValidationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: true,
    message: 'バリデーションエラーが発生しました',
    code: 400,
    errors: errors,
    timestamp: new Date().toISOString()
  });
};

/**
 * ページネーション付き成功レスポンスを返す
 * @param {object} res - Expressのresponseオブジェクト
 * @param {any} data - レスポンスデータ
 * @param {object} pagination - ページネーション情報
 * @param {string} message - 成功メッセージ
 */
const sendPaginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message: message,
    data: data,
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
      hasNextPage: pagination.hasNextPage,
      hasPrevPage: pagination.hasPrevPage
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationErrorResponse,
  sendPaginatedResponse
};
