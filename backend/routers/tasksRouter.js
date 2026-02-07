const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controller/tasksController');

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:taskId', getTaskById);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
