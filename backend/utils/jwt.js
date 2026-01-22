const jwt = require("jsonwebtoken");

// 環境変数の設定（文字列として取得）
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * JWTトークンを生成する
 * @param {Object} payload - トークンに含めるデータ（ユーザーID、ロールなど）
 * @param {string} expiresIn - 有効期限（デフォルト: 24h）
 * @returns {string} - 生成されたJWTトークン
 */
const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, { 
            expiresIn: expiresIn,
            issuer: 'habit-app' // アプリケーション識別子
        });
        return token;
    } catch (error) {
        logger.error('トークン生成エラー:', error);
        throw new Error('トークンの生成に失敗しました');
    }
};

/**
 * JWTトークンを検証する
 * @param {string} token - 検証するトークン
 * @returns {Promise<Object>} - デコードされたペイロード
 */
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new Error(`トークン検証エラー: ${err.message}`));
            } else {
                resolve(decoded);
            }
        });
    });
};

/**
 * リフレッシュトークンを生成する
 * @param {Object} payload - ユーザー情報
 * @returns {string} - リフレッシュトークン
 */
const generateRefreshToken = (payload) => {
    try {
        // リフレッシュトークンは長期間有効
        return jwt.sign(
            { ...payload, type: 'refresh' }, 
            JWT_SECRET, 
            { expiresIn: JWT_REFRESH_EXPIRES_IN }
        );
    } catch (error) {
        logger.error('リフレッシュトークン生成エラー:', error);
        throw new Error('リフレッシュトークンの生成に失敗しました');
    }
};

/**
 * トークンを更新する（アクセストークンとリフレッシュトークンの両方を新規発行）
 * @param {string} refreshToken - 有効なリフレッシュトークン
 * @returns {Promise<Object>} - 新しいアクセストークンとリフレッシュトークン
 */
const refreshTokens = async (refreshToken) => {
    try {
        // リフレッシュトークンを検証
        const decoded = await verifyToken(refreshToken);
        
        // リフレッシュトークンの種類を確認
        if (decoded.type !== 'refresh') {
            throw new Error('無効なリフレッシュトークンです');
        }
        
        // 新しいペイロード（typeを除去してアクセストークン用に）
        const newPayload = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };
        
        // 新しいアクセストークンとリフレッシュトークンを生成
        const newAccessToken = generateToken(newPayload);
        const newRefreshToken = generateRefreshToken(newPayload);
        
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: JWT_EXPIRES_IN
        };
        
    } catch (error) {
        logger.error('トークン更新エラー:', error);
        throw new Error('トークンの更新に失敗しました');
    }
};

/**
 * トークンからユーザー情報を抽出する（検証なし）
 * @param {string} token - JWTトークン
 * @returns {Object} - デコードされたペイロード
 */
const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        logger.error('トークンデコードエラー:', error);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
    generateRefreshToken,
    refreshTokens,
    decodeToken
};
