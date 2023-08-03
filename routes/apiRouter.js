const express = require('express')
const apiRouter = express()
const JWT = require('../utils/JWT')
const cityApi = require('./cityApi')
const hotelApi = require('./hotelApi')
const loginApi = require('./loginApi')
const userApi = require('./userApi')
const orderApi = require('./orderRouter')


apiRouter.use('/city',cityApi)

apiRouter.use('/hotel',hotelApi)

apiRouter.use('/login',loginApi)

//校验token，不满足则直接返回
apiRouter.use((req,res,next)=>{
    if(req.url.includes('/recieveNotify')){
        next()
        return
    }
    const token = req.headers.authorization?.split(' ')[1]
    //token不存在则无权限,直接返回
    if(!token){
        res.status(401).send({msg:'token不存在'})
        return
    } 

    //检验token
    const {userId} = JWT.verify(token)
    //如果校验失败则直接返回
    if(!userId){
        res.status(401).send({msg:'token已过期'})
        return
    } 
    //校验成功则放行并将id传给后面的中间件
    req.userId = userId
    next()
})

apiRouter.use('/user',userApi)

apiRouter.use('/ordar',orderApi)



module.exports = apiRouter