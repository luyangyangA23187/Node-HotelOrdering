const LoginService = require("../services/LoginService")

const LoginController = {
    //发送邮箱验证码
    sendEmailCode:async(req,res)=>{
        let email= req.query.emailAddress
        let data = await LoginService.sendEmailCode(email)
        res.send({data})
    }
}

module.exports = LoginController