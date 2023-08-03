const CityModel = require('../model/CityModel')
const HotelModel = require('../model/HotelModel')
const DateFormat = require('../utils/DateFormat')

const HotelService = {
    getHotelbyCityId:async(cityId)=>{

        //得到当前市级城市的区域以及酒店
        let [districtList,hotelList] = await 
            Promise.all([CityModel.getCityThree(cityId),HotelModel.getHotelbyCityId(cityId)])

        //处理数据，将区域拼到酒店列表中
        //此处改变属性名称后返回给前端
        hotelList[0].forEach(hotel=>{
            districtList[0].forEach(district=>{
                if(hotel['cit_id']===district['id']){
                    hotel['city'] = district
                }
            })
            hotel['minPrice'] = hotel['min_price']
            hotel['cityId'] = hotel['cit_id']
            delete hotel['min_price']
            delete hotel['cit_id']
        })
        return hotelList[0]
    },

    //根据酒店id得到房间列表
    getRoomByHotelId:async(id)=>{
        let data = await HotelModel.getRoomByHotelId(id)
        return data[0]
    },

    //根据酒店id得到早餐列表
    getBreakfastByHotelId:async(id)=>{
        let data = await HotelModel.getBreakfastByHotelId(id)
        return data[0]
    },

    //根据房间id,日期获取房间剩余量
    getRestRoomByRoomId:async(roomId,month,date)=>{
        //获取房间剩余量表
        let data = await HotelModel.getRestRoomByRoomId(roomId)
        //数据处理
        month = `m${month}`
        date = parseInt(date)
        let list = data[0]
        let result = []
        //计算剩余量，如果date和值相与为0则证明有空余
        list.forEach(rest=>{
            if(Object.is(date&rest[month],0)){
                //将房间id和剩余数加入结果
                result.push({roomId:rest['id'],restNum:rest[month]})
            }
        })
        //返回空余量数组
        return result
    },

    //根据房间id,日期获取房间占用情况
    getOccupiedRoomByRoomId:async(roomId,month,date)=>{
        //获取房间剩余量表
        let data = await HotelModel.getRestRoomByRoomId(roomId)
        //数据处理
        month = `m${month}`
        date = parseInt(date)
        let list = data[0]
        let result = []
        //计算剩余量，如果date和值相与为0则证明有空余
        list.forEach(rest=>{
            //如果两数相与后等于日期说明该房被占用
            if(Object.is(date&rest[month],date)){
                //将房间id和剩余数加入结果
                result.push({roomId:rest['id'],restNum:rest[month]})
            }
        })
        //返回空余量数组
        return result
    },

    //设置房间的占用情况
    setRestRoom:async(preserveNum,roomId,roomNum)=>{
        //在设置之前要先查一下究竟有无剩余
        //先检查是否跨月
        if(preserveNum[1][0]){
            //跨月,分别请求两个月的剩余量
            let [restList1,restList2] = await Promise.all([
                HotelService.getRestRoomByRoomId(roomId,preserveNum[0][0],preserveNum[0][1]),
                HotelService.getRestRoomByRoomId(roomId,preserveNum[1][0],preserveNum[1][1])])
            //不满足住房需求则直接返回
            if(Math.min(restList1.length,restList2.length)<roomNum) return false
            //设置房间占用情况
            for(let i=0;i<roomNum;i++){
                let occupied = preserveNum[0][1]|restList1[i]['restNum']
                await HotelModel.setRestRoom(restList1[i]['roomId'],preserveNum[0][0],occupied)
            }
            for(let i=0;i<roomNum;i++){
                let occupied = preserveNum[1][1]|restList2[i]['restNum']
                await HotelModel.setRestRoom(restList2[i]['roomId'],preserveNum[1][0],occupied)
            }
            //返回真
            return true
        }
        else{
            //不跨月
            let restList = await HotelService.getRestRoomByRoomId(roomId,preserveNum[0][0],preserveNum[0][1])
            //不满足住房需求则返回
            if(restList.length<roomNum) return false
            //设置房间占用情况
            for(let i=0;i<roomNum;i++){
                let occupied = preserveNum[0][1]|restList[i]['restNum']
                await HotelModel.setRestRoom(restList[i]['roomId'],preserveNum[0][0],occupied)
            }
            //返回真
            return true
        }
    },

    //释放被占用房间
    releaseOccupiedRoom:async(checkin,checkout,roomId,roomNum)=>{
        const preserveNum = DateFormat.getReserveNum(checkin,checkout)
        //找出被占用的房间释放即可
        //让占用数取反相与便可
        //找到被占用列表
        let occupiedList = await 
            HotelService.getOccupiedRoomByRoomId(roomId,preserveNum[0][0],preserveNum[0][1])
        //释放
        for(let i=0;i<roomNum;i++){
            let result = ~preserveNum[0][1]&occupiedList[i]['restNum']
            HotelModel.setRestRoom(occupiedList[i]['roomId'],preserveNum[0][0],result)
        }
        //如果跨月则重复一边上述流程
        if(!preserveNum[1][0]) return
        occupiedList = await 
            HotelService.getOccupiedRoomByRoomId(roomId,preserveNum[1][0],preserveNum[1][1])
        //释放
        for(let i=0;i<roomNum;i++){
            let result = ~preserveNum[1][1]&occupiedList[i]['restNum']
            HotelModel.setRestRoom(occupiedList[i]['roomId'],preserveNum[1][0],result)
        }
    }
}

module.exports = HotelService