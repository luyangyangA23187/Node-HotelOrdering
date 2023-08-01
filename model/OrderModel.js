const db = require('./database')
const OrderModel = {
    //根据用户id查找订单各项属性
    getUserOrder:(id)=>{
        return db.promise().query(`
        SELECT ordar.\`id\`,ordar.\`price\`,ordar.\`state\`,ordar.\`room_num\` AS roomNum,
        ordar.\`checkin\`,ordar.\`checkout\`,room.\`type\` AS roomName,
        hotel.\`name\` AS hotelName,breakfast.\`type\` AS breakfastName
        FROM ordar,room,hotel,breakfast
        WHERE ordar.\`use_id\`=${id} AND ordar.\`roo_id\`=room.\`id\` AND 
        room.\`hot_id\`=hotel.\`id\` AND ordar.\`bre_id\`=breakfast.\`id\`
        ORDER BY id DESC
        `) 
    }
}

module.exports = OrderModel