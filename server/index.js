const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const uniqid = require('uniqid');
const app = express();
require('dotenv').config();

const userRoute = require('./routes/auth.route');

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch((error) => console.error(`Connexion à MongoDB échouée : ${error}`));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    // À chaque requête, on vérifie qu'on a bien un token CSRF
    if (!req.cookies.csrfToken) {
        const csrfToken = uniqid();

        // Pas de durée pour qu'il se supprime automatiquement
        res.cookie('csrfToken', csrfToken, {
            secure: false,
            httpOnly: true,
            sameSite: 'strict',
        });

        // On le stocke ici pour une utilisation immédiate
        req.cookies.csrfToken = csrfToken;
    }

    next();
});

app.use('/api/auth', userRoute);

const port = 3000;
app.listen(port, () => console.log(`Le serveur tourne sur le port ${port}`));
