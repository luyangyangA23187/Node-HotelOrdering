const nodeemailer = require('nodemailer');
const transporter = nodeemailer.createTransport({
    host: "smtp.qq.com",						// QQ邮箱的SMTP地址
    port: 465,									// 每个邮箱的端口号可能是一样的，一般都使用465，但有些公司使用的就不是465
    auth: {
        "user": '1972887669@qq.com', 		// 你自己的邮箱的邮箱地址
        "pass": 'sxopttlcsqlpdifd'         // 上面我们提到的授权码
    }
});

module.exports.send = (email,code) => {

    let mailOptions = {
        from:'1972887669@qq.com',
        to:email,
        subject:'酒店辅助订购网站验证码',
        html:`验证码:${code} 5分钟后过期`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            return console.log(error);
        }
    });
}
