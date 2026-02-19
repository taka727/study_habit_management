const { verifyToken } = require('../utils/jwt');
const { sendErrorResponse } = require('../utils/response');
const { PrismaClient } = require('@prisma/client');
const { HTTP_STATUS , ERROR_MESSAGES} = require('../utils/constants');
const prisma = new PrismaClient();

const authenticateToken = async (req,res, next) => {
  try{
    const authHeader = req.headers['authorization'];
    const token = extractTokenFromHeader(authHeader);
    if(!token){
      return sendErrorResponse(res,HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGES.TOKEN_REQUIRED);
    }
    const decode = await verifyToken(token);
    if(!decode || !decode.id){
      return sendErrorResponse(res,HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGES.TOKEN_INVALID);
    }
    req.user = {
      id: decode.id,
      login_name: decode.login_name,
    };
    next();
  }catch(error){
    sendErrorResponse(res,HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_ERROR);
  }
};

const optionalAuth = async (req,res, next)=>{
  try {
    const authHeader = req.headers['authorization'];
    const token = extractTokenFromHeader(authHeader);
    if(!token){
      return next();
    }
    const decode = await verifyToken(token);
    if(decode && decode.id){
      req.user = {
        id: decode.id,
        login_name: decode.login_name,
      };
    }
    next();
  } catch(error) {
    next();
  }
};

const requireAdmin = (req,res,next) =>{
  if(!req.user){
    return sendErrorResponse(res,HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGES.TOKEN_REQUIRED);
  }
  if(req.user.role !== 'admin'){
    return sendErrorResponse(res,HTTP_STATUS.FORBIDDEN, 'admin権限が必要です');
  }
  next();
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

module.exports = {
  authenticateToken,
  optionalAuth,
  requireAdmin,
};
