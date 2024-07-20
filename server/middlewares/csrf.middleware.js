module.exports = (req, res, next) => {
    // On vérifie qu'on a le token côté serveur et client
    if (req.cookies.csrf && req.body.csrf) {
        // On vérifie que ce sont les mêmes
        if (req.cookies.csrf !== req.body.csrf) {
            res.status(403).json({ message: 'Token CSRF invalide' });
        } else {
            next();
        }
    } else {
        res.status(403).json({ message: 'Token CSRF inexistant' });
    }
};
