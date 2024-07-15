const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // On vérifie le JWT
        const decodedToken = jwt.verify(req.cookies.jwt, process.env.SECRET);

        // On rend accessible l'id aux fonctions suivantes
        req.auth = {
            id: decodedToken.id,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: "Vous n'êtes pas connecté", isAuth: false });
    }
};
