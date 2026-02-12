const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  getUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');

const router = express.Router();

router.get('/', authenticateToken, getUser);
router.put('/', authenticateToken, updateUser);
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
