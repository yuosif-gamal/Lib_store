var express = require('express');
var storeController = require('../controller/storeController');
const router = express.Router();
router.get("/stores" , storeController.getAllStores);
router.post("/store/save" , storeController.saveStore);
router.get('/stores/:store_id/total-books', storeController.calculateTotalBooksInStore);

module.exports = router;