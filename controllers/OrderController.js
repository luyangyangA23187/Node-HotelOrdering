const OrderService = require("../services/OrderService")
const JWT = require('../utils/JWT')

const OrderController = {
    getUserOrder:async(req,res)=>{
        //得到用户id
        const id = req.userId
        //根据id得到订单列表
        const orderList = await OrderService.getUserOder(id)
        //返回
        JWT.generate({userId:id},'1h',res)
        res.send({
            status:true,
            data:orderList
        })
    }
}

module.exports = OrderController