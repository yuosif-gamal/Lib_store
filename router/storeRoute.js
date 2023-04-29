var express = require('express');
var storeController = require('../controller/storeController');
const router = express.Router();
router.get("/store" , storeController.getAllStores);
router.post("/store/save" , storeController.saveStore);

module.exports = router;