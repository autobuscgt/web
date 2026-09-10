const Router = require('express')
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/private',checkRoleMiddleware('ADMIN'), (req,res) => {
    try {
        return res.status(200).json({message:'Вы имеете доступ к ресурсу'})
    } catch (error) {
        return res.status(403).json({message:'Вы НЕ имеете доступ к ресурсу'})
    }
})
router.get('/public', (req,res) => {
    return res.status(200).json({message:'Вы имеете доступ к ресурсу'})
})

module.exports = router;