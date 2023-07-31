const UserModel = require('../model/UserModel')
const UserService={
    getUserInfo:async(id)=>{
        //得到用户信息并返回
        let result = await UserModel.getUserInfo(id)
        return result[0][0]
    },

    updateUserInfo:async(id,updateInfo)=>{
        //更新用户信息
        const {name,phone} = updateInfo
        await UserModel.updateUserInfo([name,phone,id])
        //找出用户信息
        let result = await UserModel.getUserInfo(id)
        return result[0][0]
    }
}

module.exports = UserService