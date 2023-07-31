const express = require('express')
const LoginController = require('../controllers/LoginController')
const router = express.Router()

//发送注册信息
router.post('/register',LoginController.addUser)

//发送邮箱验证码
router.get('/sendEmail',LoginController.sendEmailCode)

//登录验证
router.post('/checkEmailCode',LoginController.checkEmailCode)

module.exports = router