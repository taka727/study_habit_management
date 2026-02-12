const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controller/tasksController');

const router = express.Router();

router.get('/', authenticateToken, getAllTasks);
router.get('/:taskId', authenticateToken, getTaskById);
router.post('/', authenticateToken, createTask);
router.put('/:taskId', authenticateToken, updateTask);
router.delete('/:taskId', authenticateToken, deleteTask);

module.exports = router;
