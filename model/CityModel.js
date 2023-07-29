const db = require('./database')
const CityModel = {
    getCity:()=>{
        return db.promise().query('SELECT * FROM city WHERE levelType = 1 OR levelType=2')
    },

    getCityThree:(id)=>{
        return db.promise().query(`SELECT * FROM city  WHERE cityName = 
        (SELECT NAME FROM city WHERE id=${id}) AND levelType=3`)
    }
}

module.exports = CityModel