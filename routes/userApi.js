const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

//获取用户信息
router.get('/getUser',UserController.getUserInfo)

//更新用户信息
router.post('/updateUser',UserController.updateUserInfo)

module.exports = router