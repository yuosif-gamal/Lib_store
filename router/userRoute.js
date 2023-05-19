var express = require('express');
var userController = require('../controller/userController');
const router = express.Router();

router.get("/users" , userController.getAllUsers);

router.get("/user/:id" , userController.getUserDetails);
router.post("/user/register" , userController.register);


module.exports = router;