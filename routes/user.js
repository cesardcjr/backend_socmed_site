const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

//User Registration
router.post("/register", userController.registerUser);

//Retrieve All Users
router.get("/all", userController.getAllUsers);

//Retrieve specific user
router.get("/find", userController.getUserByName);

//User authentication
router.post("/login", userController.userAuthentication);

module.exports = router;
