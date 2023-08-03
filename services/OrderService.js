const OrderModel = require("../model/OrderModel")
const mutex = require('../utils/Mutex')
const DateFormat = require('../utils/DateFormat')
const HotelService = require("./HotelService")
const alipaySdk = require('../utils/Alipay')

const OrderService = {
    //得到用户订单
    getUserOrder:async(id)=>{
        let data = await OrderModel.getUserOrder(id)
        return data[0]
    },

    //增加新的订单
    addOrder:async(orderObj,userId)=>{
        const {rooId,roomNum,breId,price,checkin,checkout} = orderObj
        //预约数组
        let preserveNum = DateFormat.getReserveNum(checkin,checkout)
        //上锁
        await mutex.setLock()
        
        //如果占位不成功则直接解锁返回0
        if(!await HotelService.setRestRoom(preserveNum,rooId,roomNum)){
            mutex.unLock()
            return 0
        }

        //房间占据成功则开始插入订单
        await OrderModel.addOrder([rooId,userId,breId,price,'支付中',checkin,checkout,roomNum])
        //获得刚插入的订单号
        const data = await OrderModel.getInsertedOrderId()
        const id = data[0][0]['id']
        //解锁
        mutex.unLock()

        return id
    },

    accessAlipay:async(orderId,price)=>{
        //异步通知回调
        const notifyUrl = `http://d268xk.natappfree.cc/api/ordar/recieveNotify`
        //付款成功跳转
        const returnUrl = 'http://localhost:3000/#/hotels'
        //订单数据
        const bizContent={
            out_trade_no: orderId,
            product_code: "FAST_INSTANT_TRADE_PAY",
            subject: "Hotel Reserve",
            body: "Hotel Reserve",
            total_amount: Number(price).toFixed(2),
        }
        
        //调用支付宝接口返回html代码片段
        const result = await alipaySdk.pageExec('alipay.trade.page.pay',
        {
            method:'POST',
            bizContent:bizContent,
            notifyUrl:notifyUrl,
            returnUrl:returnUrl,
            timeout_express:'5m'
        })

        //设置定时器,超时未支付则删除订单
        setTimeout(()=>OrderService.deleteOrder(orderId),600000)
        return result
    },

    //退款
    refundOrder:async(orderId,userId)=>{
        //得到订单信息
        const data = await OrderModel.getOrderById(orderId)
        const {state,price,checkin,checkout,room_num,roo_id,use_id} = data[0][0]
        //如果用户id不匹配则不允许退单
        if(use_id!==userId) return false
        //如果已经退款则不进行退款
        if(state=='退单') return false
        //进行退款
        //请求参数
        const biz_content = {
            out_trade_no:orderId,
            refund_amount:price,
        } 

        let result = null

        try{
            //得到退款结果
            result = await alipaySdk.exec('alipay.trade.refund',{
                bizContent:biz_content
            })
        }catch(e){
            console.log(e)
            return false 
        }

        //退款失败
        if(result['fundChange']!='Y') return false

        //释放占用房间
        HotelService.releaseOccupiedRoom(checkin,checkout,roo_id,room_num)
        //把订单状态改成退单
        OrderService.changeOrderState(orderId,'退单')

        return true
    },

    //删除订单
    deleteOrder:async(id)=>{
        let data = await OrderModel.getOrderById(id)
        const {state,checkin,checkout,room_num,roo_id} = data[0][0]
        //如果没有完成支付则删除订单
        if(state=='支付中'){
            //释放空余房间
            HotelService.releaseOccupiedRoom(checkin,checkout,roo_id,room_num)
            //删除订单
            OrderModel.deleteOrder(id)
        }
    },

    //改变订单状态
    changeOrderState:async(id,state)=>{
        OrderModel.setOrderState(id,state)
    }

}


module.exports = OrderService