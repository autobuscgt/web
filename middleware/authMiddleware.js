const jwt = require('jsonwebtoken');
const SECRET_FOR_JWT = process.env.SECRET_KEY

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Token not provided' });
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_FOR_JWT);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}