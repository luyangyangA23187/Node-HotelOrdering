const express = require('express')
const OrderController = require('../controllers/OrderController')
const router = express.Router()

//获取用户订单
router.get('/getOrderForUsers',OrderController.getUserOrder)

//增加订单
router.post('/postOrder',OrderController.addOrder)

//退单
router.post('/refund',OrderController.refundOrder)

//接受支付宝的异步调用
router.post('/recieveNotify',OrderController.recieveNotify)


module.exports = router