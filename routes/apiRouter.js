const express = require('express')
const apiRouter = express()
const cityApi = require('./cityApi')
const hotelApi = require('./hotelApi')

apiRouter.use('/city',cityApi)

apiRouter.use('/hotel',hotelApi)

module.exports = apiRouter