const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController');

// Get all authors
router.get('/authors', authorController.getAllAuthors);
router.put('/authors/:id', authorController.updateAuthorById);
router.delete('/authors/:id', authorController.deleteAuthorById);
router.get('/authors/:id', authorController.getAuthorById);

// Save a new author
router.post('/authors', authorController.saveAuthor);

module.exports = router;
