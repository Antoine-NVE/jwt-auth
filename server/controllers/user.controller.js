const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        // On récupère l'utilisateur avec son id
        user = await user.save();

        const expiresIn = 24 * 60 * 60 * 1000; // 24h

        // Création du JWT
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: expiresIn });

        // Envoie du JWT dans un cookie
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

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.status(401).json({ message: 'Identifiants incorrects' });
        } else {
            const isValid = await bcrypt.compare(req.body.password, user.password);

            if (!isValid) {
                res.status(401).json({ message: 'Identifiants incorrects' });
            } else {
                const expiresIn = 24 * 60 * 60 * 1000; // 24h

                // Création du JWT
                const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: expiresIn });

                // Envoie du JWT dans un cookie
                res.cookie('jwt', token, {
                    secure: false,
                    httpOnly: true,
                    maxAge: expiresIn,
                });

                res.status(200).json({ message: `Connecté en tant que ${user.username}` });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.logout = (req, res) => {
    try {
        if (!req.cookies.jwt) {
            res.status(400).json({ message: "Vous n'êtes pas connecté" });
        } else {
            res.clearCookie('jwt');
            res.status(200).json({ message: 'Vous avez été déconnecté' });
        }
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
