/* Import du modèle User */
const User = require('../models/User');

/* Import du package bcrypt pour le hashage du mot de passe */
const bcrypt = require('bcrypt');

/* Import du package jwt pour la signature du token */
const jwt = require('jsonwebtoken');

/* Export de la fonction création du user */
exports.signup = (req, res, next) => {
    /* Hashage du mot de passe */
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            /* Creation du user */
            const user = new User({
                email: req.body.email,
                password: hash
            });

            /* Enregistrement du user dans la BdD*/
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur enregistré avec succès !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

/* Export de la fonction de connexion du user */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'login ou mot de passe incorrect'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'login ou mot de passe incorrecte' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
}