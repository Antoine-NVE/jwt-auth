module.exports = (req, res, next) => {
    // On vérifie qu'on a le token côté serveur et client
    if (req.cookies.csrfToken && req.body.csrfToken) {
        // On vérifie que ce sont les mêmes
        if (req.cookies.csrfToken !== req.body.csrfToken) {
            res.status(403).json({ message: 'Token CSRF invalide' });
        } else {
            next();
        }
    } else {
        res.status(403).json({ message: 'Token CSRF inexistant' });
    }
};
