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

router.get('/', authenticateToken, getAllHistories);
router.post('/', authenticateToken, createHistory);
router.get('/:historyId', authenticateToken, getHistory);
router.put('/:historyId', authenticateToken, updateHistory);
router.delete('/:historyId', authenticateToken, deleteHistory);
router.post('/start', authenticateToken, startStudyHistory);
router.put('/:historyId/end', authenticateToken, endStudyHistory);

module.exports = router;
