const express = require('express');
const { getAllGoals, getGoalById, createGoal, updateGoal, deleteGoal } = require('../controller/goalsController');

const router = express.Router();

router.get('/', getAllGoals);
router.get('/:id', getGoalById);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
