const LoginModel = require("../model/LoginModel")
const { send } = require("./SendMailer")
const LoginService = {
    sendEmailCode:async(email)=>{
        //生成随机的四位数字
        let code = Math.random().toString().slice(2,6)
        //插入验证码
        let data = await LoginModel.addkEmailCode(email,code)
        //此处配合前端,0为邮箱未注册,1为发送邮件成功
        if(!data[0].affectedRows) return 0
        //五分钟后删除验证码
        setTimeout(()=>LoginModel.removeEmailCode(email),300000)
        //发送邮件
        send(email,code)
        return 1
    }
}


module.exports = LoginService