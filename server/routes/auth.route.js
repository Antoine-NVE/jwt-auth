const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authMiddleware, authController.logout);
router.get('/is-auth', authMiddleware, authController.isAuth);

module.exports = router;
