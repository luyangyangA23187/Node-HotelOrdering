const CityModel = require('../model/CityModel')
const HotelModel = require('../model/HotelModel')

const HotelService = {
    getHotelbyCityId:async(cityId)=>{

        //得到当前市级城市的区域以及酒店
        let [districtList,hotelList] = await 
            Promise.all([CityModel.getCityThree(cityId),HotelModel.getHotelbyCityId(cityId)])

        //处理数据，将区域拼到酒店列表中
        //此处改变属性名称后返回给前端
        hotelList[0].forEach(hotel=>{
            districtList[0].forEach(district=>{
                if(hotel['cit_id']===district['id']){
                    hotel['city'] = district
                }
            })
            hotel['minPrice'] = hotel['min_price']
            hotel['cityId'] = hotel['cit_id']
            delete hotel['min_price']
            delete hotel['cit_id']
        })
        return hotelList[0]
    },

    //根据酒店id得到房间列表
    getRoomByHotelId:async(id)=>{
        let data = await HotelModel.getRoomByHotelId(id)
        return data[0]
    },

    //根据酒店id得到早餐列表
    getBreakfastByHotelId:async(id)=>{
        let data = await HotelModel.getBreakfastByHotelId(id)
        return data[0]
    },

    //根据房间id获取房间剩余量
    getRestRoomByRoomId:async(roomId,month,date)=>{
        //获取房间剩余量表
        let data = await HotelModel.getRestRoomByRoomId(roomId)
        //数据处理
        month = `m${month}`
        date = parseInt(date)
        let list = data[0]
        let result = []
        //计算剩余量，如果date和值相与为0则证明有空余
        list.forEach(rest=>{
            if(Object.is(date&rest[month],0)){
                result.push(rest['id'])
            }
        })
        //返回空余量数组
        return result
    }
}

module.exports = HotelService