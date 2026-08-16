// backend/lambda.js
// AWS Lambda エントリーポイント。
// Express app（app.js）を @vendia/serverless-express でラップし、
// API Gateway / Lambda Function URL 等のイベントを Express にブリッジする。
const serverlessExpress = require('@vendia/serverless-express');
const app = require('./app');

exports.handler = serverlessExpress({ app });
