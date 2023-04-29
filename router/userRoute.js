var express = require('express');
var userController = require('../controller/userController');
const router = express.Router();

router.get("/users" , userController.getAllUsers);

router.get("/user/details/:id" , userController.getUserDetails);
router.post("/user/save" , userController.saveUser);


module.exports = router;