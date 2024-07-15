const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

// router.get('/set-cookie', userController.setCookie);
// router.get('/get-cookie', userController.getCookie);

module.exports = router;
