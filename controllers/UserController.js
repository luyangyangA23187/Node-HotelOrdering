const UserService = require('../services/UserService')
const UserController = {
    addUser:async(req,res)=>{
        let userRegisterInfo = req.body
        let data = await UserService.addUser(userRegisterInfo)
        res.send({
            status:true,
            data:data
        })
    }
}

module.exports = UserController