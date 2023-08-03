const OrderService = require("../services/OrderService")
const JWT = require('../utils/JWT')

const OrderController = {
    getUserOrder:async(req,res)=>{
        //得到用户id
        const id = req.userId
        //根据id得到订单列表
        const orderList = await OrderService.getUserOrder(id)
        //返回
        JWT.generate({userId:id},'1h',res)
        res.send({
            status:true,
            data:orderList
        })
    },

    //加入订单
    addOrder:async(req,res)=>{
        //得到订单数据和用户id
        const orderObj = req.body
        const id = req.userId
        //得到已经插入的订单id
        const orderId = await OrderService.addOrder(orderObj,id)
        //如果订单号为0则证明插入没有成功,通知前端
        JWT.generate({userId:id},'1h',res)
        if(!orderId){
            res.send({
                status:true,
                data:0,
                msg:'无剩余房间'
            })
            return
        }

        //得到订单号,对接支付宝
        let result = await OrderService.accessAlipay(orderId,req.body.price)
        res.send({
            status:true,
            data:result
        })
    },

    //退单
    refundOrder:async(req,res)=>{
        const userId = req.userId
        const orderId = req.body.orderId
        //退单-退款-释放房间
        let result = await OrderService.refundOrder(orderId,userId)
        JWT.generate({userId:userId},'1h',res)
        
        if(!result){
            //退单失败
            res.send({
                status:true,
                data:0,
                msg:'退单失败'
            })
        }
        else{
            //退单成功
            res.send({
            status:true,
            data:1
        })
        }
        
    },


    //接受支付宝的通知
    recieveNotify:(req,res)=>{
        const result = req.body
        console.log('success')
        //如果交易完成,则改变订单状态
        if(result['trade_status']=='TRADE_SUCCESS'){
            //改变订单状态
            OrderService.changeOrderState(result['out_trade_no'],'预订')
            //将流水号加入订单列表 

        }
    }

}

module.exports = OrderController