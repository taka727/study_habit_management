const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

/**
 * パスワードをハッシュ化する
 * @param {string} password - 平文パスワード
 * @returns {Promise<string>} - ハッシュ化されたパスワード
 */
const hashPassword = async (password) => {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('パスワードは8文字以上の文字列である必要があります');
    }
    if (password.length < 8) {
      throw new Error('パスワードは8文字以上である必要があります');
    }
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    logger.error('Error hashing password:', error);
    throw error;
  }
};

/**
 * パスワードを検証する
 * @param {string} password - 平文パスワード
 * @param {string} hash - ハッシュ化されたパスワード
 * @returns {Promise<boolean>} - 検証結果
 */
const verifyPassword = async (password, hash) => {
  try {
    if (!password || !hash) {
      throw new Error('パスワードとハッシュは必須です');
    }

    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    logger.error('パスワード認証エラー:', error.message);
    throw error;
  }
};

const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  return {
    isStrong: strength >= 4,
    score: strength,
    checks,
    message: strength >= 4 ? '強力' : strength >= 3 ? '普通' : '弱い',
  };
};

module.exports = {
  hashPassword,
  verifyPassword,
  checkPasswordStrength,
};
