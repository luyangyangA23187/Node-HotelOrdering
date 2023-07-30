const db = require('./database')
const UserModel = {
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
}

module.exports = UserModel