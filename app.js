const express = require('express')

const app = express()
const apiRouter = require('./routes/apiRouter')

//解析post请求的中间件
app.use(express.json())

app.use('/api',apiRouter)

app.listen(8080,()=>{
    console.log('server start')
})