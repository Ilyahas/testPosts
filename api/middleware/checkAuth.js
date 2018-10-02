const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
    try {
        let token = '';
        if (req.headers.authorization === undefined){
            token =  req.query.api_key;
        } else {
            token = req.headers.authorization.split(' ')[1]
        }
        console.log('[token]:', token);
        const decoded = jwt.verify(token, config.secret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};