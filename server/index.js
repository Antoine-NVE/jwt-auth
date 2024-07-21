const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const authRoute = require('./routes/auth.route');
const csrfRoute = require('./routes/csrf.route');
const csrfService = require('./services/csrf.service');

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
        csrfService.createToken(req, res);
    }

    next();
});

app.use('/api/auth', authRoute);
app.use('/api/csrf', csrfRoute);

const port = 3000;
app.listen(port, () => console.log(`Le serveur tourne sur le port ${port}`));
