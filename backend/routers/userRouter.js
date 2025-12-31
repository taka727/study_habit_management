const express = require('express');
const { 
    getUser,
  updateUser,
  deleteUser
 } = require('../controller/userController');

const router = express.Router();

router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;