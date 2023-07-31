const UserService = require('../services/UserService')
const JWT = require('../utils/JWT')
const UserController = {
    //得到用户信息
    getUserInfo:async(req,res)=>{
        //得到用户id
        const id = req.userId
        //获取用户信息
        let userInfo = await UserService.getUserInfo(id)
        //将用户信息返回
        JWT.generate({userId:id},'1h',res)
        res.send({
            status:true,
            data:userInfo
        })
    },

    //更新用户信息
    updateUserInfo:async(req,res)=>{
        //得到用户信息
        const id = req.userId
        let updateInfo = req.body
        //进行更新并得到更新后的数据
        let userInfo = await UserService.updateUserInfo(id,updateInfo)
        //返回
        JWT.generate({userId:id},'1h',res)
        res.send({
            status:true,
            data:userInfo
        })
    }
}

module.exports = UserController