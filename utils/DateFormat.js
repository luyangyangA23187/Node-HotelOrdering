const dayjs = require('dayjs')
const DateFormat={
    //输入入住日期和离店日期,得到月份与对应二进制数
    getReserveNum:(checkin,checkout)=>{
        let temp = [[0, 0], [0, 0]]
        let date_0 = DateFormat.getDateNum(checkin)
        let date_1 = DateFormat.getDateNum(checkout)
        //住房的持续时间
        const lastTime = dayjs(checkout).diff(checkin, 'day')
        //预定时间跨月份
        if (date_0.month != date_1.month && date_1.day != 1) {
            //入住月份
            temp[0][0] = date_0.month
            temp[1][0] = date_1.month
            //持续时间-入住月
            let timeBin = ''
            for (let i = 0; i < dayjs(checkin).daysInMonth(); i++) {
                if (i >= date_0.day - 1) {
                    timeBin = `1${timeBin}`
                    continue
                }
                timeBin = `0${timeBin}`
            }
            temp[0][1] = parseInt(timeBin, 2)
            //持续时间-离店月
            timeBin = ''
            for (let i = 0; i < date_1.day-1; i++) {
                timeBin = `1${timeBin}`
            }
            temp[1][1] = parseInt(timeBin, 2)
            //赋值
            return temp
        }
        //预定时间不跨月份
        //入住月份
        temp[0][0] = date_0.month
        //入住持续时间
        let timeBin = ''
        for (let i = 0; i < date_0.day; i++) {
            //终止循环条件
            if (i == date_0.day - 1) {
                //入住日期赋1
                timeBin = 1 + timeBin
                for (let j = 0; j < lastTime - 1; j++) {
                    timeBin = `1${timeBin}`
                }
            }
            //其余时间赋值为0
            timeBin = `0${timeBin}`
        }
        temp[0][1] = parseInt(timeBin, 2)
        //赋值
        return temp
    },
    //根据字符串得到日期的年月日
    getDateNum(date){
        let num = date.split('-')
        num = num.map(e=>parseInt(e))
        return {
            year:num[0],
            month:num[1],
            day:num[2]
        }
    }
}

module.exports = DateFormat