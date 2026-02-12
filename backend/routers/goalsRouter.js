const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getAllGoals, getGoalById, createGoal, updateGoal, deleteGoal } = require('../controller/goalsController');

const router = express.Router();

router.get('/', authenticateToken, getAllGoals);
router.get('/:id', authenticateToken, getGoalById);
router.post('/', authenticateToken, createGoal);
router.put('/:id', authenticateToken, updateGoal);
router.delete('/:id', authenticateToken, deleteGoal);

module.exports = router;
