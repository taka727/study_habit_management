const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getUser,
  updateUser,
  deleteUser,
  getUserSettings,
  updateUserSettings,
} = require('../controller/userController');

const router = express.Router();

router.get('/', authenticateToken, getUser);
router.put('/', authenticateToken, updateUser);
router.get('/settings', authenticateToken, getUserSettings);
router.put('/settings', authenticateToken, updateUserSettings);
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
