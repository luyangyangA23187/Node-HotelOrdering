const UserModel = require('../model/UserModel')
const UserService={
    addUser:async(registerInfo)=>{
        const {name,email,phone,sexual,uid} = registerInfo

        //检查邮箱和uid有无重复
        let [emailRet,uidRet] = 
            await Promise.all([UserModel.checkRegisterEmail(email),UserModel.checkRegisterUid(uid)])
            
        //这里主要是为了配合前端,结果0为插入成功,2为邮箱重复,1位身份证号重复
        if(emailRet[0].length) return 2
        if(uidRet[0].length) return 1

        //插入用户
        UserModel.addUser([name,email,phone,sexual,uid])
        return 0
    }
}

module.exports = UserService