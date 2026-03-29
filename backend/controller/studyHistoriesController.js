const prisma = require('../prismaClient');
const { Prisma } = require('@prisma/client');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

const getAllHistories = async (req, res) => {
  logger.info('start getALLHistories');
  const { from, to } = req.query;
  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({status : 'error',message:error.array()});
  }
  const fromDate = from ? new Date(from) : undefined;
  const toDate = to ? new Date(new Date(to).setHours(23, 59, 59, 999)) : undefined;

  try {
    logger.info(fromDate);
    logger.info(toDate);

    const histories = await prisma.study_histories.findMany({
      where: {
        created_at: {
          gte: fromDate,
          lte: toDate,
        },
        deleted_at: null,
      },
    });
    logger.info(histories);
    res.status(200).json({ status: 'success', data: histories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end getALLHistories');
  }
};

const createHistory = async (req, res) => {
  logger.info('start createHistory');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ status: 'error', message: error.array() });
  }
  const { task_id, description, occurred_on, started_at, ended_at } = req.body;
  try {
    const newHistory = await prisma.study_histories.create({
      data: {
        task_id,
        description,
        occurred_on,
        started_at,
        ended_at,
      },
    });
    res.status(201).json({ status: 'success', data: newHistory });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end createHistory');
  }
};

const getHistory = async (req, res) => {
  logger.info('start getHistory');
  const { id } = req.params;
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({ status: 'error', message: 'Invalid id format' });
  }

  try {
    const history = await prisma.study_histories.findFirst({
      where: {
        id: parsedId,
        deleted_at: null,
      },
    });
    if (!history) {
      return res.status(404).json({ status: 'error', message: '履歴が存在しません' });
    }
    res.status(200).json({ status: 'success', data: history });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end getHistory');
  }
};

const updateHistory = async (req, res) => {
  logger.info('start updateHistory');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ status: 'error', message: error.array() });
  }
  const { id } = req.params;
  const { task_id, description, occurred_on, started_at, ended_at } = req.body;

  try {
    const updatedHistory = await prisma.study_histories.update({
      where: {
        id: parseInt(id),
        deleted_at: null,
      },
      data: {
        task_id,
        description,
        occurred_on,
        started_at,
        ended_at,
      },
    });
    res.status(200).json({ status: 'success', data: updatedHistory });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end updateHistory');
  }
};

const deleteHistory = async (req, res) => {
  const { id } = req.params;
  logger.info('start deleteHistory');
  try {
    const result = await prisma.study_histories.updateMany({
      where: {
        id: parseInt(id),
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
      },
    });
    if (result.count === 0) {
      return res.status(404).json({ status: 'error', message: '履歴が存在しません' });
    }
    res.status(200).json({ status: 'success' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ status: 'error', message: '履歴が存在しません' });
    }
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end deleteHistory');
  }
};

const startStudyHistory = async (req, res) => {
  logger.info('start startStudyHistory');
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ status: 'error', message: error.array() });
  }
  const { task_id, description, occurred_on } = req.body;
  try {
    const newHistory = await prisma.study_histories.create({
      data: {
        task_id,
        description,
        occurred_on,
        started_at: new Date(),
        ended_at: null,
      },
    });
    res.status(201).json({ status: 'success', data: newHistory });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end startStudyHistory');
  }
};

const endStudyHistory = async (req, res) => {
  logger.info('start endStudyHistory');
  const { id } = req.params;
  try {
    const endedHistory = await prisma.study_histories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ended_at: new Date(),
      },
    });
    res.status(200).json({ status: 'success', data: endedHistory });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  } finally {
    logger.info('end endStudyHistory');
  }
};

module.exports = {
  getAllHistories,
  createHistory,
  getHistory,
  updateHistory,
  deleteHistory,
  startStudyHistory,
  endStudyHistory,
};
