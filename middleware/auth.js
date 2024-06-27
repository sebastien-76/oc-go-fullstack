const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /* Le header authorization contient bearer et le token, on split et récupère le token */
        const token = req.headers.authorization.split(' ')[1];
        /* Verification du token */
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        /* Récupération de l'userId */
        const userId = decodedToken.userId;
        /* On ajoute l'userId dans le body de la requête */
        req.auth = { userId };
    } catch(error) {
        res.status(401).json({error});
    }
}