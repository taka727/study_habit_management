const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getAllHistories,
  createHistory,
  getHistory,
  updateHistory,
  deleteHistory,
  startStudyHistory,
  endStudyHistory,
} = require('../controller/studyHistoriesController');

const router = express.Router();

const { body, query } = require('express-validator');

const createHistoryInputRules = [
  body('occurred_on')
    .notEmpty()
    .withMessage('実施日は必須です')
    .isISO8601()
    .withMessage('日付の形式が間違っています。(YYYY-MM-DD)'),
];

const updateHistoryInputRules = [
  body('occurred_on')
    .optional()
    .isISO8601()
    .withMessage('日付の形式が間違っています。(YYYY-MM-DD)'),
];

const getHistoryInputRules = [
  query('from').optional().isISO8601(),
  query('to').optional().isISO8601(),
];

router.get('/', authenticateToken, getHistoryInputRules, getAllHistories);
router.post('/', authenticateToken, createHistoryInputRules, createHistory);
router.get('/:id', authenticateToken, getHistory);
router.put('/:id', authenticateToken, updateHistoryInputRules, updateHistory);
router.delete('/:id', authenticateToken, deleteHistory);
router.post('/start', authenticateToken, createHistoryInputRules, startStudyHistory);
router.put('/:id/end', authenticateToken, endStudyHistory);

module.exports = router;
