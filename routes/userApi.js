const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()


//用户注册
router.post('/register',UserController.addUser)

module.exports = router