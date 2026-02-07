const express = require('express');
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

router.get('/', getAllHistories);
router.post('/', createHistory);
router.get('/:historyId', getHistory);
router.put('/:historyId', updateHistory);
router.delete('/:historyId', deleteHistory);
router.post('/', startStudyHistory);
router.put('/:historyId', endStudyHistory);

module.exports = router;
