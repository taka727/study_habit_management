const prisma = require('../prismaClient');
const { Prisma } = require('@prisma/client');
const logger = require('../utils/logger');

const getAllTasks = async (req, res) => {
  logger.info('📋 getAllTasks: Starting to fetch all tasks');
  try {
    const tasks = await prisma.tasks.findMany();
    logger.info(`getAllTasks: Successfully fetched ${tasks.length} tasks`);
    logger.info('Tasks data:', JSON.stringify(tasks, null, 2));
    res.json({ status: 'success', data: tasks, count: tasks.length });
  } catch (error) {
    logger.error('getAllTasks: Error occurred:', error);
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  }
};

const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  logger.info(`🔍 getTaskById: Fetching task with ID: ${taskId}`);

  try {
    const id = Number(taskId);
    if (!Number.isInteger(id) || id <= 0) {
      logger.info(`getTaskById: Invalid task ID provided: ${taskId}`);
      return res.status(400).json({ status: 'error', message: '無効なタスクID' });
    }

    logger.info(`getTaskById: Searching for task with valid ID: ${id}`);
    const task = await prisma.tasks.findUniqueOrThrow({
      where: { id: id },
    });

    logger.info('getTaskById: Successfully found task:', JSON.stringify(task, null, 2));
    res.json({ status: 'success', data: task });
  } catch (error) {
    logger.error(`getTaskById: Error occurred for taskId ${taskId}:`, error);
    if (error instanceof Prisma.NotFoundError) {
      logger.info(`getTaskById: Task not found for ID: ${taskId}`);
      return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
    } else {
      return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
  }
};

const createTask = async (req, res) => {
  logger.info('createTask: Starting to create new task');
  logger.info('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } = req.body;

    if (!taskTitle || !taskDescription) {
      logger.info('createTask: Missing required fields');
      return res.status(400).json({
        status: 'error',
        message: 'タスクタイトルと説明は必須です',
      });
    }

    const newTask = await prisma.tasks.create({
      data: {
        name: taskTitle,
        description: taskDescription,
        status: taskStatusId || 'TODO',
        exec_expected_date: new Date(taskStartTime),
        deadline: new Date(taskEndTime),
      },
    });

    logger.info('createTask: Successfully created task:', JSON.stringify(newTask, null, 2));
    res.status(201).json({ status: 'success', data: newTask });
  } catch (error) {
    logger.error('createTask: Error occurred:', error);
    res.status(500).json({ status: 'error', message: 'サーバーエラー' });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  logger.info(`updateTask: Starting to update task with ID: ${taskId}`);
  logger.info('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const id = Number(taskId);
    if (!Number.isInteger(id) || id <= 0) {
      logger.info(`updateTask: Invalid task ID provided: ${taskId}`);
      return res.status(400).json({ status: 'error', message: '無効なタスクID' });
    }

    const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } = req.body;

    const updateData = {};
    if (taskTitle !== undefined) updateData.name = taskTitle;
    if (taskDescription !== undefined) updateData.description = taskDescription;
    if (taskStatusId !== undefined) updateData.status = taskStatusId;
    if (taskStartTime !== undefined) updateData.exec_expected_date = new Date(taskStartTime);
    if (taskEndTime !== undefined) updateData.deadline = new Date(taskEndTime);

    const updatedTask = await prisma.tasks.update({
      where: { id: id },
      data: updateData,
    });

    logger.info('updateTask: Successfully updated task:', JSON.stringify(updatedTask, null, 2));
    res.json({ status: 'success', data: updatedTask });
  } catch (error) {
    logger.error(`updateTask: Error occurred for taskId ${taskId}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      logger.info(`updateTask: Task not found for ID: ${taskId}`);
      return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
    } else {
      return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  logger.info(`deleteTask: Starting to delete task with ID: ${taskId}`);

  try {
    const id = Number(taskId);
    if (!Number.isInteger(id) || id <= 0) {
      logger.info(`deleteTask: Invalid task ID provided: ${taskId}`);
      return res.status(400).json({ status: 'error', message: '無効なタスクID' });
    }

    await prisma.tasks.delete({
      where: { id: id },
    });

    logger.info(`deleteTask: Successfully deleted task with ID: ${taskId}`);
    res.json({ status: 'success', message: 'タスクが削除されました' });
  } catch (error) {
    logger.error(`deleteTask: Error occurred for taskId ${taskId}:`, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      logger.info(`deleteTask: Task not found for ID: ${taskId}`);
      return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
    } else {
      return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
