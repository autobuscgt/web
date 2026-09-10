const { User } = require('../models/models') 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_FOR_JWT = 'ioqifasoifjassojifjiasof'

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const candidate = await User.findOne({ where: {login} });
        if (!candidate) {
            return res.status(404).json({ message: 'Not found' })
        };
        const match = await bcrypt.compare(password, candidate.password);
        if (!match) {
            return res.status(401).json({ message: 'Not authorization' })
        };
        const token = jwt.sign({ login: candidate.login, role: candidate.role }, SECRET_FOR_JWT, { expiresIn: '24h' })
        return res.status(201).json({ message: 'User authorization', token: token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' });
    }
}
exports.register = async (req, res) => {
    try {
        const { login, password, role, email } = req.body;
        const candidate = await User.findOne({ where:{login} });
        if (!login || !password || !role || !email) {
            return res.status(400).json({ message: 'Bad request' })
        }
        if (candidate) {
            return res.status(409).json({ message: 'Already exist' })
        };
        const hashPassword = await bcrypt.hash(password, 7);
        const new_user = await User.create({ login, password: hashPassword, role, email })
        const token = jwt.sign({ login: new_user.login, role: new_user.role }, SECRET_FOR_JWT, { expiresIn: '24h' })
        return res.status(201).json({ message: 'User registered', token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
