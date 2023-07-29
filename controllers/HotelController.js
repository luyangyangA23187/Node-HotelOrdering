const HotelService = require('../services/HotelService')
const HotelController = {
    //根据城市id获取酒店列表
    getHotelbyCityId:async(req,res)=>{
        let {cityId} = req.query
        let hotelList = await HotelService.getHotelbyCityId(cityId)
        res.send({
            status:true,
            data:hotelList
        })
    }
}

module.exports = HotelController
