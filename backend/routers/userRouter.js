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

const { body } = require('express-validator');

const deleteUserInputRules = [body('id').notEmpty().withMessage('idは必須です')];

router.get('/', authenticateToken, getUser);
router.put('/', authenticateToken, updateUser);
router.get('/settings', authenticateToken, getUserSettings);
router.put('/settings', authenticateToken, updateUserSettings);
router.delete('/', authenticateToken, deleteUserInputRules, deleteUser);

module.exports = router;
