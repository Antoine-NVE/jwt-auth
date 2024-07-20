const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const csrfMiddleware = require('../middlewares/csrf.middleware');

router.post('/register', csrfMiddleware, authController.register);
router.post('/login', csrfMiddleware, authController.login);
router.get('/logout', authMiddleware, authController.logout);
router.get('/is-auth', authMiddleware, authController.isAuth);

module.exports = router;
