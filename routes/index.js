const Router = require('express')
const router = new Router();
const userRoutes = require('./userRoutes')
const baseRoutes = require('./baseRoutes')

router.use('/auth', userRoutes)
router.use('/test', baseRoutes)

module.exports = router;