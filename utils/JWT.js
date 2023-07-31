const jwt = require('jsonwebtoken')
const secret = 'hotel-A23187'
const JWT = {

    //加密内容并设置过期时间,将token拼接到请求中
    generate:(value,expires,res)=>{
        const token = jwt.sign(value,secret,{expiresIn:expires})
        res.header('Authorization',token)
    },

    //解密
    verify:(token)=>{
        try{
            return jwt.verify(token,secret)
        }catch(err){
            return false
        }
    },
}

module.exports = JWT