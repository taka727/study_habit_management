const passwordMethod = require('../../../utils/password');

describe('Password Utility Functions', () => {
  const password = 'TestPassword123!';

  test('ハッシュ化が成功する', async () => {
    const hash = await passwordMethod.hashPassword(password);
    expect(hash).toBeDefined();
    expect(typeof hash).toBe('string');
  });

  test('パスワード検証が成功する', async () => {
    const hash = await passwordMethod.hashPassword(password);
    const isValid = await passwordMethod.verifyPassword(password, hash);
    expect(isValid).toBe(true);
  });

  test('パスワード強度をチェックできる', () => {
    const result = passwordMethod.checkPasswordStrength(password);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('isStrong');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('message');
    expect(typeof result.isStrong).toBe('boolean');
    expect(typeof result.score).toBe('number');
    expect(['強力', '普通', '弱い']).toContain(result.message);
  });
});