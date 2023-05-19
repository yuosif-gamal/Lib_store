var express = require('express');
var bookController = require('../controller/bookController');
const router = express.Router();

router.get("/books" , bookController.getAllBooks);
router.get('books/authors/:authorId', bookController.getBooksByAuthor);

router.get("/book/details/:id" , bookController.getBookDetails);
router.post("/book/save" , bookController.saveBook);

router.put("/book/update/" , bookController.updateBook);
router.get("/books/store/:store_id" , bookController.getBookInSpscificStore);
router.delete("/book/delete/:id" , bookController.deleteBook);

module.exports = router;