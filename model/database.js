const mysql2 = require('mysql2')
const db = mysql2.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'111111',
    database:'hotelmanage',
    connectionLimit:1
})

module.exports = db