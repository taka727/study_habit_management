const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controller/booksController');

const router = express.Router();

router.get('/', authenticateToken, getAllBooks);
router.get('/:id', authenticateToken, getBookById);
router.post('/', authenticateToken, createBook);
router.put('/:id', authenticateToken, updateBook);
router.delete('/:id', authenticateToken, deleteBook);

module.exports = router;
