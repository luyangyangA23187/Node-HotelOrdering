const express = require('express')
const apiRouter = express()
const cityApi = require('./cityApi')
const hotelApi = require('./hotelApi')
const userApi = require('./userApi')
const loginApi = require('./loginApi')

apiRouter.use('/city',cityApi)

apiRouter.use('/hotel',hotelApi)

apiRouter.use('/user',userApi)

apiRouter.use('/login',loginApi)

module.exports = apiRouter