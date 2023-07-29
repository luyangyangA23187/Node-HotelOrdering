const CityService = require('../services/CityService')
const CityController = {
    //获取城市列表,一级与二级城市
    getCity:async (req,res)=>{
        let cityList = await CityService.getCity()
        res.send({
            status:true,
            data:cityList
        })
    },

    getCityThree:async(req,res)=>{
        let {cityId} = req.query
        let districtList = await CityService.getCityThree(cityId)
        console.log(districtList)
        res.send({
            status:true,
            data:districtList
        })
    }
}

module.exports = CityController