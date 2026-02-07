const { verifyToken } = require('../utils/jwt');
const { sendErrorResponse } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');
const { HTTP_STATUS , ERROR_MESSAGES} = require('../utils/constants');
const prisma = new PrismaClient();

const authenticateToken = async (req,res, next) => {
  try{
    // 1. Authorizationヘッダーからトークン取得
    const authHeader = req.headers['authorization'];
    const token = extractTokenFromHeader(authHeader);
    // 2. トークンの存在確認
    if(!token){
      return sendErrorResponse(res,HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGES.TOKEN_REQUIRED);
    }
    // 3. JWT検証
    const decode = await verifyToken(token);
    // 4. ユーザー情報をreq.userに設定
    if(!decode || !decode.userID){
      return sendErrorResponse(res,HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGES.TOKEN_INVALID);
    }
    req.user = {
      id: decode.userID,
      role: decode.role,
    };
    // 5. next()でリクエスト継続
    next();
  }catch(error){
    sendErrorResponse(res,HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_ERROR);
  }
};

const optionalAuth = async (req,res, next)=>{
  // トークンがあれば検証、なくてもエラーにしない
  // 公開エンドポイントで「ログイン済みなら追加情報」を提供する場合
};

const requireAdmin = (req,res,next) =>{
  // authenticateTokenの後に使用
  // req.user.roleをチェック
};

/**
 * Authorizationヘッダーからトークンを抽出
 * @param {string} authHeader - "Bearer <token>" 形式
 * @returns {string|null} - 抽出されたトークンまたはnull
 */
const extractTokenFromHeader = (authHeader) => {
  // ヒント:
  // - authHeaderの存在確認
  // - "Bearer " で始まるかチェック
  // - "Bearer " 以降の部分を取得
  // - 空文字列でないことを確認

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7); // "Bearer " = 7文字
  return token.trim() || null;
};
