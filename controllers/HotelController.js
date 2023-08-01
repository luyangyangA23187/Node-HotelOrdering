const HotelService = require('../services/HotelService')
const HotelController = {
    //根据城市id获取酒店列表
    getHotelbyCityId:async(req,res)=>{
        //得到城市id
        const {cityId} = req.query
        //得到酒店列表
        let hotelList = await HotelService.getHotelbyCityId(cityId)
        res.send({
            status:true,
            data:hotelList
        })
    },

    //根据酒店id获取房间列表
    getRoombyHotelId:async(req,res)=>{
        //得到酒店id
        const {hotelId} = req.query
        //得到房间列表
        let roomList = await HotelService.getRoomByHotelId(hotelId)
        //返回
        res.send({
            status:true,
            data:roomList
        })
    },

    //根据酒店id获取早餐列表，步骤同上获取房间列表
    getBreakfastbyHotelId:async(req,res)=>{
        //得到酒店id
        const {hotId:hotelId} = req.query
        //得到早餐列表
        let breakfastList = await HotelService.getBreakfastByHotelId(hotelId)
        //返回
        res.send({
            status:true,
            data:breakfastList
        })
    },

    //根据房间id获取房间剩余量情况
    getRestRoomByRoomId:async(req,res)=>{
        const {roomId,month,date} = req.query
        //得到剩余量数组
        const restList = await HotelService.getRestRoomByRoomId(roomId,month,date)
        //返回剩余量
        res.send({
            status:true,
            data:restList.length
        })
    }
}

module.exports = HotelController
