const jwt = require('jsonwebtoken');

const authService = require('../services/auth.service');

module.exports = (req, res, next) => {
    try {
        // On vérifie le JWT
        const decodedToken = jwt.verify(req.cookies.jwt, process.env.SECRET);

        // On récupère l'heure à laquelle le JWT aura vécu plus de 50% de son temps
        const halfLifeTime = (decodedToken.iat + decodedToken.exp) / 2;

        // On récupère l'heure actuelle
        const currentTime = Date.now() / 1000;

        // Si l'on a dépassé la moitié de la vie du token, on le refresh
        // Si l'utilisateur ne s'est pas connecté depuis trop longtemps, le token expire et le refresh n'est plus possible, il faut se login
        if (currentTime > halfLifeTime) {
            authService.connectUser(res, decodedToken.id);
        }

        // On rend accessible l'id aux fonctions suivantes
        req.auth = {
            id: decodedToken.id,
        };

        next();
    } catch (error) {
        res.status(401).json({ message: "Vous n'êtes pas connecté"});
    }
};
