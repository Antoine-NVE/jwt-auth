const jwt = require('jsonwebtoken');

exports.connectUser = (res, userId, secret = process.env.SECRET, expiresIn = 24 * 60 * 60) => {
    // Création du JWT
    const token = jwt.sign({ id: userId }, secret, { expiresIn: expiresIn }); // expiresIn demande des secondes

    // Envoie du JWT dans un cookie
    res.cookie('jwt', token, {
        secure: false,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: expiresIn * 1000, // maxAge demande des millisecondes
    });
};
