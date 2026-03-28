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
router.get('/:id', authenticateToken, getHistory);
router.put('/:id', authenticateToken, updateHistory);
router.delete('/:id', authenticateToken, deleteHistory);
router.post('/start', authenticateToken, startStudyHistory);
router.put('/:id/end', authenticateToken, endStudyHistory);

module.exports = router;
