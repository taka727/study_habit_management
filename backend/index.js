// backend/index.js
// ローカル開発用エントリーポイント。
// アプリケーション定義は app.js に分離済み。
// Lambda 環境（AWS_LAMBDA_FUNCTION_NAME が設定されている）では
// app.listen() を呼ばず、lambda.js 経由で serverless-express が
// リクエストをハンドリングする。
const app = require('./app');
const logger = require('./utils/logger');

const port = process.env.BACKEND_PORT || process.env.PORT || 3000;

if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
