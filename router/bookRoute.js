var express = require('express');
var bookController = require('../controller/bookController');
const router = express.Router();
console.log("hhh");
router.get("/books" , bookController.getAllBooks);
router.get("/books/authors/id/:author_id", bookController.getBooksByAuthorID);
router.get("/books/authors/name/:author_name", bookController.getBooksByAuthorName);
router.get("/books/title/:title", bookController.getBookDetailsByTitle);

router.get("/book/details/:id" , bookController.getBookDetailsByID);
router.post("/book/save" , bookController.saveBook);

router.put("/book/update/" , bookController.updateBook);
router.get("/books/store/:store_id" , bookController.getBookInSpscificStore);
router.delete("/book/delete/:id" , bookController.deleteBook);
router.get('/books/arrange', bookController.arrangeBooksAlphabetically);
router.get('/books/pages/:startPage/:endPage', bookController.getBooksByPageRange);

module.exports = router;