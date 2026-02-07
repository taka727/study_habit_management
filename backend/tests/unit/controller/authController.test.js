const authController = require('../../../controller/authController');

// Prismaクライアントのモック
jest.mock('../../../prismaClient', () => ({
  users: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  security_questions: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  security_question_answers: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  $transaction: jest.fn(),
}));

// JWTユーティリティのモック
jest.mock('../../../utils/jwt', () => ({
  generateToken: jest.fn(() => 'mock-token'),
}));

// bcryptjsのモック
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(() => Promise.resolve('mock-salt')),
  hash: jest.fn(() => Promise.resolve('mock-hash')),
  compare: jest.fn(() => Promise.resolve(true)),
}));

describe('AuthController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      user: null,
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    test('必須フィールドが不足している場合400エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('ログイン名が重複している場合409エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('正常にユーザー登録できる場合201を返す', async () => {
      // TODO: テスト実装
    });

    test('セキュリティ質問が存在しない場合404エラーを返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('loginUser', () => {
    test('必須フィールドが不足している場合400エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('ユーザーが存在しない場合401エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('セキュリティ回答が一致しない場合401エラーを返す', async () => {
      // TODO: テスト実装
    });

    test('正常にログインできる場合200とトークンを返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('getSecurityQuestion', () => {
    test('セキュリティ質問一覧を取得できる', async () => {
      // TODO: テスト実装
    });

    test('サーバーエラー時に500を返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('logoutUser', () => {
    test('正常にログアウトできる場合200を返す', async () => {
      // TODO: テスト実装
    });
  });
});
