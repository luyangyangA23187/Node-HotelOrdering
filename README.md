# Node-HotelOrdering
## 1.描述
这是在项目结束后为方便对项目做改进,用node+express+mysql实现的酒店辅助订购系统的后端,其功能仅面向用户平台。实现的功能包括：
+ 对城市、酒店、房间、早餐等信息的查询
+ 用户注册、登录、修改信息、提交订单、查询订单、退单
+ 接入支付宝、实现支付与退款的功能
+ 实现token验证
## 2.数据库设计
### 2.1城市
描述：城市信息,省市县三级城市均在这张表中。
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|城市的唯一标识|
|id|int|城市等级,分为1/2/3三级分别代表省/市/县|
|name|varchar()|城市名|
|shortName|varchar()|城市简称，做展示用|
|cityName|varchar()|市级城市的名称,只有县级和市级城市有该项|
|province|varchar()|省级城市的名称,1/2/3级城市均有该项|
### 2.2酒店
描述：酒店信息,包含酒店名称,描述等信息。
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|酒店的唯一标识|
|cit_id|bigint|酒店的城市id,此处为第三级城市的id|
|name|varchar()|酒店的名称|
|address|varcahr()|酒店的地址|
|min_price|float|酒店的最低价格|
|picture|varchar()|酒店的预览图|
|longitude|float|酒店的经度|
|latitude|float|酒店的纬度|
|description|varchar()|酒店的描述|
### 2.3房型
描述：酒店的房型信息。
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|房型的唯一标识|
|hot_id|bigint|对应酒店的id|
|type|varchar()|房型的名称：单人房/双人房等|
|price|double|房型对应的价格|
|picture|varchar()|房型的预览图|
### 2.4早餐
描述：酒店对应的早餐。
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|早餐的唯一标识|
|hot_id|bigint|对应酒店的id|
|type|varchar()|早餐的名称：无早/单早/双早|
|price|double|早餐对应的价格|
### 2.5房间表
描述：一个房型会对应多个房间，房间表的作用主要是为了储存房间的占用情况。
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|房间的唯一标识|
|room_id|bigint|对应房型的id|
|m1-m12|bigint|此处为12个属性代表12个月,计算时转化为位运算标识房间占用情况|
### 2.6酒店管理
描述：酒店对应的管理人,是一张面向后台管理系统的表。用来存储酒店对应的管理人。
|属性|类型|描述|
|:---|:---|:------|
|hot_id|bigint|酒店id|
|use_id|bigint|用户id,即这个酒店的管理人|
### 2.7用户
描述:用户信息
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|用户的唯一标识|
|name|varchar()|用户姓名|
|email|varchar()|用户邮箱,保持唯一性|
|phone|varchar()|用户手机号|
|sexual|char|用户性别|
|level|int|用户等级,分为1/2/3级用于区分普通用户，酒店管理员，超级管理员|
|code|varchar()|用于储存邮箱验证码|
|uid|varchar()|用户身份证号|
### 2.8订单
描述：订单信息
|属性|类型|描述|
|:---|:---|:------|
|id|bigint|订单的唯一标识|
|roo_id|bigint|房型id|
|use_id|bigint|用户id|
|bre_id|bigint|早餐id|
|price|double|订单金额|
|state|varcahr()|订单状态:支付中/预订/完成/退单|
|checkin|varchar()|入住时间|
|checkout|varchar()|离店时间|
|room_num|varchar()|预订房间数量|
## 3.接口
接口均为/api开头
### 3.1城市(/city)
#### 3.1.1请求一二级城市列表
+ 接口路径：/getCity
+ 请求方式：get
+ 接口描述：得到一二级城市（即省市级城市）的信息
+ 参数信息：无
+ 返回响应:城市信息列表
#### 3.1.2请求三级城市列表
+ 接口路径：/getCityThree?cityId=.
+ 接口描述：得到指定二级城市的所有三级城市的信息
+ 请求方式：get
+ 参数信息：cityId为二级城市的id
+ 返回响应：指定二级城市的三级城市列表
### 3.2酒店(/hotel)
#### 3.2.1请求酒店列表
+ 接口路径：/getHotelWithCity?cityId=.
+ 接口描述：得到指定二级城市的所有酒店的信息
+ 请求方式：get
+ 参数信息：cityId为二级城市的id
+ 返回响应：指定二级城市的酒店列表
#### 3.2.2请求房型列表
+ 接口路径：/getRoom?hotelId=.
+ 接口描述：得到指定酒店的房型列表
+ 请求方式：get
+ 参数信息：hotelId为酒店id
+ 返回响应：指定酒店的房型列表
#### 3.2.3请求早餐列表
+ 接口路径：/getBreakfast?hotId=.
+ 接口描述：得到指定酒店的早餐列表
+ 请求方式：get
+ 参数信息：hotelId为酒店id
+ 返回响应：指定酒店的早餐列表
#### 3.2.4请求房型剩余量
+ 接口路径：/selectRoom?roomId=.&month=.&date=.
+ 接口描述：得到指定房型在指定时间段的剩余量
+ 请求方式：get
+ 参数信息：roomId为房型id，month为月份，date为时间段的二进制表示
+ 返回响应：指定房型指定时间段内的剩余量
### 3.3登录(/login)
#### 3.3.1提交注册信息
+ 接口路径：/register
+ 接口描述：提交注册信息
+ 请求方式：post
+ 参数信息：json数据( name:string,email:string,phone:string,sexual:string,uid:string)
+ 返回响应：0：注册成功 1：身份证号已被注册 2：邮箱已被注册
#### 3.3.2给指定邮箱发送
+ 接口路径：/sendEmail?emailAddress=.
+ 接口描述：给指定邮箱发送验证码
+ 请求方式：get
+ 参数信息：emailAddress为邮箱
+ 返回响应：0：发送成功 1：邮箱未注册
#### 3.3.2登录验证
+ 接口路径：/checkEmailCode
+ 接口描述：进行登录验证
+ 请求方式：post
+ 参数信息：json数据(emailAddress:string,code:string)
+ 返回响应：0：验证失败 1：验证成功
### 3.4用户(/user)
#### 3.4.1得到用户信息
+ 接口路径：/getUser
+ 接口描述：得到用户信息
+ 请求方式：get
+ 参数信息：需要后端设定的token
+ 返回响应：用户信息
#### 3.4.2修改用户信息
+ 接口路径：/updateUser
+ 接口描述：修改用户信息
+ 请求方式：post
+ 参数信息：需要后端设定的token
+ 返回响应：修改完后的用户信息
### 3.5订单(/ordar)
#### 3.5.1得到用户订单列表
+ 接口路径：/getOrderForUsers
+ 接口描述：得到用户订单列表
+ 请求方式：get
+ 参数信息：需要后端设定的token
+ 返回响应：用户的订单列表
#### 3.5.2提交订单
+ 接口路径：/postOrder
+ 接口描述：提交订单
+ 请求方式：post
+ 参数信息：需要后端设定的token
+ 返回响应：支付宝发回的html片段,通过submit可以跳转到支付页面
#### 3.5.3退单
+ 接口路径：/refund
+ 接口描述：退单
+ 请求方式：post
+ 参数信息：json数据(orderId:number) 需要后端设定的token
+ 返回响应：0:退单失败 1:退单成功
#### 3.5.4接受支付宝异步回调
+ 接口路径：/recieveNotify
+ 接口描述：接受支付宝的异步回调，用于支付成功后修改订单状态
+ 请求方式：post
+ 参数信息：无
+ 返回响应：无
