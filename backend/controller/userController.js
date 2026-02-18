const prisma = require('../prismaClient');
const logger = require('../utils/logger');
const { Prisma } = require('@prisma/client');

const getUser = async (req, res) => {
  logger.info('start getUser');
  try {
    // 認証ミドルウェアからユーザーIDを取得（または固定値）
    const userId = req.user?.id || 1;

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        login_name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      logger.info(`getUser: User not found with ID: ${userId}`);
      return res
        .status(404)
        .json({ status: 'error', message: 'ユーザが存在しません' });
    }

    logger.info(`getUser: Successfully fetched user with ID: ${userId}`);
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    logger.error('getUser: Error occurred:', error);
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end getUser');
  }
};

const updateUser = async (req, res) => {
  logger.info('start updateUser');
  try {
    // 認証ミドルウェアからユーザーIDを取得（または固定値）
    const userId = req.user?.id || 1;
    const { name, login_name } = req.body;

    // バリデーション
    if (!name && !login_name) {
      logger.info('updateUser: No fields to update');
      return res.status(400).json({
        status: 'error',
        message: '更新する項目が指定されていません',
      });
    }

    // 更新するデータを動的に作成
    const updateData = {};
    if (typeof name === 'string' && name.length > 0 && name.length < 100) updateData.name = name;
    if (typeof login_name === 'string' && login_name.length >= 3 && login_name.length <= 255) updateData.login_name = login_name;

    logger.info(
      `updateUser: Updating user ID: ${userId} with data:`,
      updateData,
    );

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        login_name: true,
        created_at: true,
        updated_at: true,
      },
    });

    logger.info(`updateUser: Successfully updated user with ID: ${userId}`);
    res.status(200).json({ status: 'success', data: updatedUser });
  } catch (error) {
    logger.error('updateUser: Error occurred:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        logger.info('updateUser: Unique constraint violation (login_name)');
        return res.status(409).json({
          status: 'error',
          message: 'このログイン名は既に使用されています',
        });
      }
      if (error.code === 'P2025') {
        logger.info('updateUser: User not found');
        return res.status(404).json({
          status: 'error',
          message: 'ユーザが存在しません',
        });
      }
    }
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end updateUser');
  }
};

const deleteUser = async (req, res) => {
  logger.info('start deleteUser');
  try {
    // 認証ミドルウェアからユーザーIDを取得（または固定値）
    const userId = req.user?.id || 1;

    logger.info(`deleteUser: Attempting to delete user with ID: ${userId}`);

    // ソフトデリートの実装
    const deletedUser = await prisma.users.update({
      where: {
        id: userId,
        deleateed_at: null,
      },
      data: {
        deleateed_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        login_name: true,
        deleateed_at: true,
      },
    });

    logger.info(
      `deleteUser: Successfully soft-deleted user with ID: ${userId}`,
    );
    res.status(200).json({
      status: 'success',
      message: 'ユーザを削除しました',
      data: deletedUser,
    });
  } catch (error) {
    logger.error('deleteUser: Error occurred:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        logger.info('deleteUser: User not found');
        return res.status(404).json({
          status: 'error',
          message: 'ユーザが存在しません',
        });
      }
    }
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end deleteUser');
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
