const express = require('express')
const router = express.Router()
const controller = require('../controller/controller')
const { protect } = require('../middlewares/authMidware')
const { upload } = require('../uploadConfig/multerConfig')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/getMe', protect, controller.getMe)
router.post('/file-upload', upload.single("myFile"), controller.fileUpload)

module.exports = router