const express = require('express')
const LoginController = require('../controllers/LoginController')
const router = express.Router()

//发送邮箱验证码
router.get('/sendEmail',LoginController.sendEmailCode)

module.exports = router