const prisma = require('../prismaClient');
const { Prisma } = require('@prisma/client');
const logger = require('../utils/logger');

const getAllGoals = async (req, res) => {
  try {
    logger.info('start');
    const Goal = await prisma.goals.findMany({
      where: {
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        goal_deadline: true,
      },
    });
    logger.info(Goal);
    res.status(200).json({ status: 'success', data: Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'サーバーエラー' });
  }
};

const getGoalById = async (req, res) => {
  const { id } = req.params;

  try {
    const Goal = await prisma.goals.findFirst({
      where: {
        id: parseInt(id),
        deleted_at: null,
      },
      select: {
        id: true,
        name: true,
        description: true,
        goal_deadline: true,
      },
    });
    res.status(200).json({ status: 'success', data: Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'サーバーエラー' });
  }
};

const createGoal = async (req, res) => {
  const { name, description, goal_deadline } = req.body;
  try {
    logger.info('name：' + name);
    logger.info('description：' + description);
    logger.info('deadline：' + goal_deadline);
    const Goal = await prisma.goals.create({
      data: {
        name: name,
        description: description,
        goal_deadline: goal_deadline,
      },
    });
    logger.info(Goal);
    res.status(201).json({ status: 'success', Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'サーバーエラー' });
  }
};

const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { name, description, goal_deadline } = req.body;
  try {
    logger.info('name：' + name);
    logger.info('description：' + description);
    logger.info('deadline：' + goal_deadline);
    const Goal = await prisma.goals.update({
      where: { id: parseInt(id) },
      data: {
        name: name,
        description: description,
        goal_deadline: goal_deadline,
      },
    });
    logger.info(Goal);
    res.status(201).json({ status: 'success', Goal });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error', message: 'サーバーエラー' });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    logger.info('id:' + id);
    const Goal = await prisma.goals.update({
      where: { id: parseInt(id) },
      data: {
        deleted_at: new Date(),
      },
    });
    logger.info(Goal);
    res.status(204).json({ status: 'success', Goal });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'サーバーエラー：' + error.message,
    });
  }
};

module.exports = {
  getAllGoals,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
};
