const { HTTP_STATUS, ERROR_MESSAGES } = require('../../../utils/constants');

describe('Constants', () => {
  describe('HTTP_STATUS', () => {
    test('成功ステータスコードが定義されている', () => {
      expect(HTTP_STATUS.OK).toBe(200);
      expect(HTTP_STATUS.CREATED).toBe(201);
      expect(HTTP_STATUS.NO_CONTENT).toBe(204);
    });

    test('クライアントエラーステータスコードが定義されている', () => {
      expect(HTTP_STATUS.BAD_REQUEST).toBe(400);
      expect(HTTP_STATUS.UNAUTHORIZED).toBe(401);
      expect(HTTP_STATUS.FORBIDDEN).toBe(403);
      expect(HTTP_STATUS.NOT_FOUND).toBe(404);
      expect(HTTP_STATUS.CONFLICT).toBe(409);
      expect(HTTP_STATUS.UNPROCESSABLE_ENTITY).toBe(422);
    });

    test('サーバーエラーステータスコードが定義されている', () => {
      expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toBe(500);
      expect(HTTP_STATUS.BAD_GATEWAY).toBe(502);
      expect(HTTP_STATUS.SERVICE_UNAVAILABLE).toBe(503);
    });
  });

  describe('ERROR_MESSAGES', () => {
    test('認証関連のエラーメッセージが定義されている', () => {
      expect(ERROR_MESSAGES.TOKEN_REQUIRED).toBeDefined();
      expect(ERROR_MESSAGES.TOKEN_INVALID).toBeDefined();
      expect(ERROR_MESSAGES.TOKEN_EXPIRED).toBeDefined();
      expect(ERROR_MESSAGES.USER_NOT_FOUND).toBeDefined();
      expect(ERROR_MESSAGES.UNAUTHORIZED).toBeDefined();
      expect(ERROR_MESSAGES.FORBIDDEN).toBeDefined();
    });

    test('バリデーション関連のエラーメッセージが定義されている', () => {
      expect(ERROR_MESSAGES.VALIDATION_ERROR).toBeDefined();
      expect(ERROR_MESSAGES.REQUIRED_FIELD).toBeDefined();
      expect(ERROR_MESSAGES.INVALID_FORMAT).toBeDefined();
    });

    test('データベース関連のエラーメッセージが定義されている', () => {
      expect(ERROR_MESSAGES.RESOURCE_NOT_FOUND).toBeDefined();
      expect(ERROR_MESSAGES.DUPLICATE_ENTRY).toBeDefined();
      expect(ERROR_MESSAGES.DATABASE_ERROR).toBeDefined();
    });

    test('一般的なエラーメッセージが定義されている', () => {
      expect(ERROR_MESSAGES.INTERNAL_ERROR).toBeDefined();
      expect(ERROR_MESSAGES.BAD_REQUEST).toBeDefined();
    });
  });
});
