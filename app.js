/* Import package express */
const express = require("express");

/* Import mongoose */
const mongoose = require('mongoose');

/* Import du router stuff */
const stuffRoutes = require('./routes/stuff');

/* Import du router user */
const userRoutes = require('./routes/user');

/* Import body-parser */
const bodyParser = require('body-parser');

/* Import de path */
const path = require('path');

/* Connexion au serveur MongoDB */
mongoose.connect('mongodb+srv://USER:PASSWORD@URL',

    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

/* Création d'une application express */
const app = express();

/* Ajout headers pour cors */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* Middleware body-parser */
app.use(bodyParser.json());

/* Utilisation du router pour les routese /api/stuff */
app.use('/api/stuff', stuffRoutes);

/* Utilisation du router pour la route /api/auth */
app.use('/api/auth', userRoutes);

/* Route pour les images*/
app.use('/images', express.static(path.join(__dirname, 'images')));

/*  Export de l'application */
module.exports = app;
