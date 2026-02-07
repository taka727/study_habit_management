const jwtUtils = require('../../../utils/jwt');

// jsonwebtokenのモック
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
  decode: jest.fn(),
}));

const jwt = require('jsonwebtoken');

describe('JWT Utility Functions', () => {
  const mockPayload = {
    id: 1,
    login_name: 'testuser',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    test('トークンを正常に生成できる', () => {
      // TODO: テスト実装
    });

    test('カスタム有効期限でトークンを生成できる', () => {
      // TODO: テスト実装
    });

    test('エラー時に例外をスローする', () => {
      // TODO: テスト実装
    });
  });

  describe('verifyToken', () => {
    test('有効なトークンを検証できる', async () => {
      // TODO: テスト実装
    });

    test('無効なトークンの場合エラーをスローする', async () => {
      // TODO: テスト実装
    });

    test('期限切れトークンの場合エラーをスローする', async () => {
      // TODO: テスト実装
    });
  });

  describe('generateRefreshToken', () => {
    test('リフレッシュトークンを正常に生成できる', () => {
      // TODO: テスト実装
    });

    test('ペイロードにtype: refreshが含まれる', () => {
      // TODO: テスト実装
    });
  });

  describe('refreshTokens', () => {
    test('新しいアクセストークンとリフレッシュトークンを生成できる', async () => {
      // TODO: テスト実装
    });

    test('無効なリフレッシュトークンの場合エラーをスローする', async () => {
      // TODO: テスト実装
    });

    test('type: refreshでない場合エラーをスローする', async () => {
      // TODO: テスト実装
    });
  });

  describe('decodeToken', () => {
    test('トークンをデコードできる', () => {
      // TODO: テスト実装
    });

    test('無効なトークンの場合nullを返す', () => {
      // TODO: テスト実装
    });
  });
});
