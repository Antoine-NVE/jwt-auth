const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', auth, userController.logout);
router.get('/is-auth', auth, userController.isAuth);

// router.get('/set-cookie', userController.setCookie);
// router.get('/get-cookie', userController.getCookie);

module.exports = router;
