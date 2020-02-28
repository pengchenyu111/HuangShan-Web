import {Message} from 'element-ui'

const functions = {
  dateFormat (fmt, date) {
    let ret
    let opt = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'd+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
      };
    };
    return fmt
  },
  getNowFormatDate () {
    let date = new Date()
    let seperator1 = '-'
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  },
  // 获得当前时间 2019-02-02 14:06:08
  getNowTime () {
    // 加0
    // eslint-disable-next-line camelcase
    function add_101 (num) {
      num = num + 1
      if (num < 10) {
        num = '0' + num
      }
      return num
    }
    // eslint-disable-next-line camelcase
    function add_102 (num) {
      if (num < 10) {
        num = '0' + num
      }
      return num
    }
    let myDate = new Date()
    myDate.getYear() // 获取当前年份(2位)
    myDate.getFullYear() // 获取完整的年份(4位,1970-????)
    myDate.getMonth() // 获取当前月份(0-11,0代表1月)
    myDate.getDate() // 获取当前日(1-31)
    myDate.getDay() // 获取当前星期X(0-6,0代表星期天)
    myDate.getTime() // 获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours() // 获取当前小时数(0-23)
    myDate.getMinutes() // 获取当前分钟数(0-59)
    myDate.getSeconds() // 获取当前秒数(0-59)
    myDate.getMilliseconds() // 获取当前毫秒数(0-999)
    myDate.toLocaleDateString() // 获取当前日期
    let nowTime = myDate.getFullYear() + '-' + add_101(myDate.getMonth()) + '-' + add_102(myDate.getDate()) + ' ' + add_102(myDate.getHours()) + ':' + add_102(myDate.getMinutes()) + ':' + add_102(myDate.getSeconds())
    return nowTime
  },
  showSuccessMessage (text) {
    Message({
      message: text,
      type: 'success',
      center: true,
      duration: 1000
    })
  },
  showErrorMessage (text) {
    Message({
      message: text,
      type: 'error',
      center: true,
      duration: 1000
    })
  }
}
export {
  functions
}
