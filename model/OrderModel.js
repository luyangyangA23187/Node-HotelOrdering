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
    },

    //插入订单
    addOrder:(orderArr)=>{
        return db.promise().query(`
        INSERT INTO ordar(roo_id,use_id,bre_id,price,state,checkin,checkout,room_num) 
        VALUES(?,?,?,?,?,?,?,?) 
        `,orderArr)
    },

    //得到刚插入的订单号
    getInsertedOrderId:()=>{
        return db.promise().query(`
        SELECT max(id) AS id FROM ordar
        `)
    },

    //查找指定订单
    getOrderById:(id)=>{
        return db.promise().query(`
        SELECT * FROM ORDAR WHERE id=${id} 
        `)
    },

    //改变订单状态
    setOrderState:(id,state)=>{
        return db.promise().query(`
        UPDATE ordar SET state='${state}' WHERE id=${id}
        `)
    },

    //删除订单
    deleteOrder:(id)=>{
        return db.promise().query(`
        delete from ordar where id=${id}
        `)
    }
}

module.exports = OrderModel