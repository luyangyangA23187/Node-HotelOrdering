const express = require('express')
const router = express.Router()
const CityController = require('../controllers/CityController')

//得到一二级城市列表，即省市
router.get('/getCity',CityController.getCity)

//根据市级城市ID得到区域
router.get('/getCityThree',CityController.getCityThree)

module.exports = router