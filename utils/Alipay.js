const AlipaySDK = require('alipay-sdk')

const alipaySdk = new AlipaySdk({
    appId: '9021000122694114',
    keyType: 'PKCS8', 
    privateKey: fs.readFileSync('private-key.pem', 'ascii'),
    alipayPublicKey: fs.readFileSync('alipay-public-key.pem', 'ascii'),
  });