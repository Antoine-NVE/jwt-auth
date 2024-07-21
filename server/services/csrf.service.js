const uniqid = require('uniqid');

exports.createToken = (req, res) => {
    const csrfToken = uniqid();

    // Pas de durée pour qu'il se supprime automatiquement
    res.cookie('csrfToken', csrfToken, {
        secure: false,
        httpOnly: true,
        sameSite: 'strict',
    });

    // On le stocke ici pour une utilisation immédiate
    req.cookies.csrfToken = csrfToken;
};
