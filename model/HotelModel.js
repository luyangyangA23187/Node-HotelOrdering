const db = require('./database')
const HotelModel={
    //根据城市id获取酒店列表
    getHotelbyCityId:(cityId)=>{
        return db.promise().query(`SELECT * FROM hotel
        WHERE cit_id IN (SELECT id FROM city WHERE
        cityName = (SELECT NAME FROM city WHERE
        id = ${cityId}))`)
    },

    //根据酒店id获取房间列表
    getRoomByHotelId:(hotelId)=>{
        return db.promise().query(`
        SELECT * FROM room WHERE hot_id=${hotelId}
        `)
    },

    //根据酒店id获取早餐列表
    getBreakfastByHotelId:(hotelId)=>{
        return db.promise().query(`
        SELECT * FROM breakfast WHERE hot_id=${hotelId}
        `)
    },

    //根据房间id获取房间剩余情况
    getRestRoomByRoomId:(roomId)=>{
        return db.promise().query(`
        SELECT * FROM restroom WHERE roomId=${roomId}
        `)
    }
}


module.exports = HotelModel
