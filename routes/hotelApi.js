const express = require('express')
const router = express.Router()
const HotelController = require('../controllers/HotelController')

//得到一二级城市列表，即省市
router.get('/getHotelWithCity',HotelController.getHotelbyCityId)

module.exports = router