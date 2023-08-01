const express = require('express')
const OrderController = require('../controllers/OrderController')
const router = express.Router()

//获取用户订单
router.get('/getOrderForUsers',OrderController.getUserOrder)


module.exports = router