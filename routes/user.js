const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//Sign up a user.
router.post('/', userController.createUser);

//Login a user.
router.post('/login', userController.loginUser);

module.exports = router;
