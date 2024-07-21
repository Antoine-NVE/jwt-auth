const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        // On récupère l'utilisateur avec son id
        user = await user.save();

        // On connecte l'utilisateur avec un token stocké dans un cookie
        authService.connectUser(res, user._id);

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
                // On connecte l'utilisateur avec un token stocké dans un cookie
                authService.connectUser(res, user._id);

                res.status(200).json({ message: `Connecté en tant que ${user.username}` });
            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Vous avez été déconnecté' });
};

exports.isAuth = (req, res) => {
    // On renvoie juste un booléen pour indiquer que l'utilisateur est connecté
    // S'il ne l'est pas, c'est le middleware auth.js qui va l'indiquer
    res.status(200).json({ message: 'Utilisateur connecté'});
};

exports.readConnectedUser = async (req, res) => {
    try {
        // On récupère l'utilisateur sans le mot de passe
        const user = await User.findOne({ _id: req.auth.id }).select('-password');

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};
