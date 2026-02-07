// JWTユーティリティのモック
jest.mock('../../../utils/jwt', () => ({
  verifyToken: jest.fn(),
}));

// レスポンスユーティリティのモック
jest.mock('../../../utils/response', () => ({
  sendErrorResponse: jest.fn(),
}));

// Prismaクライアントのモック
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    users: {
      findUnique: jest.fn(),
    },
  })),
}));

const authMiddleware = require('../../../middleware/auth');
const { verifyToken } = require('../../../utils/jwt');
const { sendErrorResponse } = require('../../../utils/response');

describe('Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('authenticateToken', () => {
    test('有効なトークンでリクエストを通過させる', async () => {
      // TODO: テスト実装
    });

    test('トークンがない場合401エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('無効なトークンの場合401エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('Bearer形式でない場合401エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('req.userにユーザー情報を設定する', async () => {
      // TODO: テスト実装
    });
  });

  describe('optionalAuth', () => {
    test('トークンがある場合検証してreq.userを設定する', async () => {
      // TODO: テスト実装
    });

    test('トークンがない場合もエラーにならない', async () => {
      // TODO: テスト実装
    });
  });

  describe('requireAdmin', () => {
    test('管理者ロールの場合リクエストを通過させる', async () => {
      // TODO: テスト実装
    });

    test('管理者ロールでない場合403エラーを返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('extractTokenFromHeader', () => {
    test('Bearer トークンを正しく抽出する', () => {
      // TODO: テスト実装
      // Note: この関数はモジュールからexportされていないため、
      // authenticateTokenを通じてテストする必要がある
    });

    test('Bearer形式でない場合nullを返す', () => {
      // TODO: テスト実装
    });

    test('空のヘッダーの場合nullを返す', () => {
      // TODO: テスト実装
    });
  });
});
