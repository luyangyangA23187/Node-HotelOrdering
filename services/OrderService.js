const OrderModel = require("../model/OrderModel")

const OrderService = {
    getUserOder:async(id)=>{
        let data = await OrderModel.getUserOrder(id)
        return data[0]
    }
}

module.exports = OrderService