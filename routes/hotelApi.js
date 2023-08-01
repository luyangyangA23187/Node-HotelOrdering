const express = require('express')
const router = express.Router()
const HotelController = require('../controllers/HotelController')

//根据二级城市id得到酒店列表
router.get('/getHotelWithCity',HotelController.getHotelbyCityId)

//根据酒店id得到房间列表
router.get('/getRoom',HotelController.getRoombyHotelId)

//根据酒店id得到早餐列表
router.get('/getBreakfast',HotelController.getBreakfastbyHotelId)

//根据房间id得到房间剩余量
router.get('/selectRoom',HotelController.getRestRoomByRoomId)

module.exports = router