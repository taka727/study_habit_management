const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  logoutUser,
} = require('../controller/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/security-question', getSecurityQuestion);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;
