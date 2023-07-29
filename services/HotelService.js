const express = require('express')
const CityModel = require('../model/CityModel')
const HotelModel = require('../model/HotelModel')

const HotelService = {
    getHotelbyCityId:async(cityId)=>{

        //得到当前市级城市的区域以及酒店
        let [districtList,hotelList] = await 
            Promise.all([CityModel.getCityThree(cityId),HotelModel.getHotelbyCityId(cityId)])

        //处理数据，将区域拼到酒店列表中
        //此处改变属性名称后返回给前端
        let newList = hotelList[0].map(hotel=>{
            let {id,name,address,picture,longitude,latitude,description} = hotel
            let newHotel={id,name,address,picture,longitude,latitude,description}
            newHotel['minPrice'] = hotel['min_price']
            newHotel['cityId'] = hotel['cit_id']
            districtList[0].forEach(district=>{
                if(hotel['cit_id']===district['id']){
                    newHotel['city'] = district
                }
            })
            
            return newHotel
        })

        return newList
    }
}

module.exports = HotelService