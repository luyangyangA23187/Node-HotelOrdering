const db = require('./database')
const LoginModel = {
    addkEmailCode:(email,code)=>{
        return db.promise().query(
        `UPDATE USER
        SET code = ${code}
        WHERE email = '${email}'`
        )
    },

    removeEmailCode:(email)=>{
        return db.promise().query(
        `UPDATE USER
        SET code = null
        WHERE email = '${email}'`
        )
    }
}

module.exports = LoginModel