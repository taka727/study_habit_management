const prisma = require('../prismaClient');
const logger = require('../utils/logger');
const { Prisma } = require('@prisma/client');

const getUser = async (req, res) => {
  logger.info('start getUser');

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: req.user.id,
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
      logger.info(`getUser: User not found with ID: ${req.user.id}`);
      return res.status(404).json({ status: 'error', message: 'ユーザが存在しません' });
    }

    logger.info(`getUser: Successfully fetched user with ID: ${req.user.id}`);
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
    const { name, login_name } = req.body;

    if (!name) {
      logger.info('updateUser: No fields to update');
      return res.status(400).json({
        status: 'error',
        message: '更新する項目が指定されていません',
      });
    }

    if (!login_name) {
      logger.info('updateUser: No fields to update');
      return res.status(400).json({
        status: 'error',
        message: '更新する項目が指定されていません',
      });
    }

    const updateData = {};
    if (name !== undefined && typeof name === 'string' && name.length > 0 && name.length < 100)
      updateData.name = name;
    if (
      login_name !== undefined &&
      typeof login_name === 'string' &&
      login_name.length >= 3 &&
      login_name.length <= 255
    )
      updateData.login_name = login_name;

    logger.info(`updateUser: Updating user ID: ${req.user.id} with data:`, updateData);

    const updatedUser = await prisma.users.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        login_name: true,
        created_at: true,
        updated_at: true,
      },
    });

    logger.info(`updateUser: Successfully updated user with ID: ${req.user.id}`);
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
    logger.info(`deleteUser: Attempting to delete user with ID: ${req.user.id}`);

    const result = await prisma.users.updateMany({
      where: { id: req.user.id, deleted_at: null },
      data: { deleted_at: new Date() },
    });

    if (result.count === 0) {
      logger.info(`deleteUser: User not found or already deleted: ${req.user.id}`);
      return res.status(404).json({ status: 'error', message: 'ユーザが存在しません' });
    }

    const deletedUser = await prisma.users.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        login_name: true,
        deleted_at: true,
      },
    });

    logger.info(`deleteUser: Successfully soft-deleted user with ID: ${req.user.id}`);
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

const getUserSettings = async (req, res) => {
  res.sendStatus(501);
};
const updateUserSettings = async (req, res) => {
  res.sendStatus(501);
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserSettings,
  updateUserSettings,
};
