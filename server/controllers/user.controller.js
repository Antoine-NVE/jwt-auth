const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user = await user.save();

        const expiresIn = 24 * 60 * 60 * 1000; // 24h

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: expiresIn });

        res.cookie('jwt', token, {
            secure: false,
            httpOnly: true,
            maxAge: expiresIn,
        });
        res.status(201).json({ message: 'Utilisateur enregistré' });
    } catch (error) {
        res.status(400).json(error);
    }
};

// exports.setCookie = async (req, res) => {
//     try {
//         res.cookie('jwt', 'my-jwt', {
//             maxAge: expiresIn,
//             httpOnly: true,
//         });
//         res.send('Cookie défini');
//     } catch (error) {
//         res.send('Cookie pas défini');
//     }
// };

// exports.getCookie = async (req, res) => {
//     try {
//         const cookieValue = req.cookies.jwt;
//         if (cookieValue) {
//             res.send(cookieValue);
//         } else {
//             res.send('Cookie pas trouvé');
//         }
//     } catch (error) {
//         res.send('Erreur');
//     }
// };
