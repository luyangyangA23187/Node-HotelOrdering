const LoginService = require("../services/LoginService")
const JWT = require("../utils/JWT")

const LoginController = {
    //添加用户
    addUser:async(req,res)=>{
        let userRegisterInfo = req.body
        let data = await LoginService.addUser(userRegisterInfo)
        res.send({
            status:true,
            data:data
        })
    },

    //发送邮箱验证码
    sendEmailCode:async(req,res)=>{
        let email= req.query['emailAddress']
        let data = await LoginService.sendEmailCode(email)
        res.send({data})
    },

    //登录验证
    checkEmailCode:async(req,res)=>{
        let loginInfo = req.body
        let data = await LoginService.checkEmailCode(loginInfo)
        //不存在则返回0
        if(!data){
            res.send({
                status:false,
                data:0
            })
            return
        }
        //生成token,并将其加入响应头
        JWT.generate({userId:data},'1h',res)
        //发送
        res.send({
            status:true,
            data:1
        })
    }
}

module.exports = LoginController