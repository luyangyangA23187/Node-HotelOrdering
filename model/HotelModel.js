const db = require('./database')
const HotelModel={
    getHotelbyCityId:(cityId)=>{
        return db.promise().query(`SELECT * FROM hotel
        WHERE cit_id IN (SELECT id FROM city WHERE
        cityName = (SELECT NAME FROM city WHERE
        id = ${cityId}))`)
    }
}


module.exports = HotelModel
