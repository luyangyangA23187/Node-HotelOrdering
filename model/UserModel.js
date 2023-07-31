const db = require('./database')
const UserModel = {
    //得到用户信息
    getUserInfo:(id)=>{
        return db.promise().query(`
        SELECT name,email,phone,sexual,uid FROM USER WHERE id=${id}
        `)
    },

    //修改用户信息
    updateUserInfo:(updateArr)=>{
        return db.promise().query(`
        UPDATE USER SET name=?,phone=? WHERE id=?
        `,updateArr)
    }
}

module.exports = UserModel