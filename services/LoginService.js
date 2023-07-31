const LoginModel = require("../model/LoginModel")
const { send } = require("../utils/SendMailer")
const LoginService = {

    addUser:async(registerInfo)=>{
        //解构出信息
        const {name,email,phone,sexual,uid} = registerInfo

        //检查邮箱和uid有无重复
        let [emailRet,uidRet] = 
            await Promise.all([LoginModel.checkRegisterEmail(email),LoginModel.checkRegisterUid(uid)])
            
        //这里主要是为了配合前端,结果0为插入成功,2为邮箱重复,1位身份证号重复
        if(emailRet[0].length) return 2
        if(uidRet[0].length) return 1

        //插入用户
        LoginModel.addUser([name,email,phone,sexual,uid])
        return 0
    },

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
    },

    checkEmailCode:async(loginInfo)=>{
        let {emailAddress:email,code} = loginInfo
        //返回查询结果
        let result = await LoginModel.checkEmailCode(email,code)
        //没有查到则返回0，查到则返回id
        if(!result[0].length) return 0
        return result[0][0]['id']
    }
}

module.exports = LoginService