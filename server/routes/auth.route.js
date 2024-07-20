const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const csrfMiddleware = require('../middlewares/csrf.middleware');

// On utilise le csrfMiddleware sur toutes les requêtes qui ne sont pas des GET
// On utilise le authMiddleware sur toutes les requêtes sauf celles d'inscription/connexion
// D'abord le auth puis le csrf
router.post('/register', csrfMiddleware, authController.register);
router.post('/login', csrfMiddleware, authController.login);
router.get('/logout', authMiddleware, authController.logout);
router.get('/is-auth', authMiddleware, authController.isAuth);
router.get('/connected-user', authMiddleware, authController.readConnectedUser);

module.exports = router;
