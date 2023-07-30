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
    }
}

module.exports = HotelService