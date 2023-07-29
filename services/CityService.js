const express = require('express')
const CityModel = require('../model/CityModel')

const CityService = {
    getCity:async()=>{
        let cityList = await CityModel.getCity()
        return cityList[0]
    },

    getCityThree:async(cityId)=>{
        let districtList = await CityModel.getCityThree(cityId)
        return districtList[0]
    },
}

module.exports = CityService