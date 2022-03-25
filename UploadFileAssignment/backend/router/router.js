const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const { protect } = require('../middlewares/authMidware')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/getMe', protect, controller.getMe)

module.exports = router