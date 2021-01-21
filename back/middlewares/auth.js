const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.cookies.loginToken;
    if(!token) {
        res.status(401).json({ errors: ['Access Denied!, Please Login first.'] });
    }

    try {
        const verified = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = verified.userId;
        next();
    } catch(error) {
        res.status(400).json({ errors: ['You\'re not logged in!'] });
    }
}

module.exports = auth;