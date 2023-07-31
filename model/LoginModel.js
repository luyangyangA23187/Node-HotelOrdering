const db = require('./database')
const LoginModel = {

    //检查邮箱是否存在
    checkRegisterEmail:(email)=>{
        return db.promise().query(`SELECT * FROM USER WHERE email='${email}'`)
    },

    //检查身份证号是否存在
    checkRegisterUid:(uid)=>{
        return db.promise().query(`SELECT * FROM USER WHERE uid='${uid}'`)
    },

    //插入用户
    addUser:(userInfoArr)=>{
        return db.promise().query(`
        INSERT INTO USER(NAME,email,phone,sexual,LEVEL,uid) VALUES(?,?,?,?,1,?)
        `,userInfoArr)},

    //添加验证码
    addkEmailCode:(email,code)=>{
        return db.promise().query(
        `UPDATE USER
        SET code = ${code}
        WHERE email = '${email}'`
        )
    },

    //移除验证码
    removeEmailCode:(email)=>{
        return db.promise().query(
        `UPDATE USER
        SET code = null
        WHERE email = '${email}'`
        )
    },

    //检查邮箱和验证码
    checkEmailCode:(email,code)=>{
        return db.promise().query(
        `SELECT id FROM USER WHERE email='${email}' AND CODE='${code}'`
        )
    }
}

module.exports = LoginModel