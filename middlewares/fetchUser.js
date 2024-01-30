const jwt = require('jsonwebtoken');
const secretKey = '1234$Secret^Key';

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, secretKey);
        req.userId = data.userId;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}

module.exports = fetchUser;