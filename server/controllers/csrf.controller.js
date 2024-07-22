const csrfService = require('../services/csrf.service');

exports.read = (req, res) => {
    // À chaque requête, on vérifie qu'on a bien un token CSRF
    if (!req.cookies.csrfToken) {
        csrfService.createToken(req, res);
    }

    res.status(200).json({ csrfToken: req.cookies.csrfToken });
};
