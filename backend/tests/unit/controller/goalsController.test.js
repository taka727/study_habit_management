const goalsController = require('../../../controller/goalsController');

// Prismaクライアントのモック
jest.mock('../../../prismaClient', () => ({
  goals: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

describe('GoalsController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getAllGoals', () => {
    test('全ての目標を取得できる', async () => {
      // TODO: テスト実装
    });

    test('削除済みの目標は取得されない', async () => {
      // TODO: テスト実装
    });

    test('サーバーエラー時に500を返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('getGoalById', () => {
    test('指定IDの目標を取得できる', async () => {
      // TODO: テスト実装
    });

    test('目標が存在しない場合nullを返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('createGoal', () => {
    test('目標を作成できる', async () => {
      // TODO: テスト実装
    });

    test('サーバーエラー時に500を返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('updateGoal', () => {
    test('目標を更新できる', async () => {
      // TODO: テスト実装
    });

    test('サーバーエラー時に500を返す', async () => {
      // TODO: テスト実装
    });
  });

  describe('deleteGoal', () => {
    test('目標を論理削除できる', async () => {
      // TODO: テスト実装
    });

    test('サーバーエラー時に500を返す', async () => {
      // TODO: テスト実装
    });
  });
});
