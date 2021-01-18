import sortBy from 'lodash/sortBy'
import trim from 'lodash/trim'
var date = {
  getMaxTime (format) {
    var types = ['HH', 'H', 'mm', 'm', 'ss', 's']
    var times = ['23', '23', '59', '59', '59', '59']
    var maxTime = format
    for (let i = 0; i < types.length; i++) {
      maxTime = maxTime.replace(types[i], times[i])
    }
    return maxTime
  },
  getMinTime (format) {
    var types = ['HH', 'H', 'mm', 'm', 'ss', 's']
    var times = ['00', '0', '00', '0', '00', '0']
    var minTime = format
    for (let i = 0; i < types.length; i++) {
      minTime = minTime.replace(types[i], times[i])
    }
    return minTime
  },
  getStandardTimeFormatArray (format) {
    var types = ['HH', 'H', 'mm', 'm', 'ss', 's']
    var effectiveTypes = []
    for (let i = 0; i < types.length; i++) {
      var index = format.indexOf(types[i], types)
      if (index > -1) {
        effectiveTypes.push({
          type: types[i],
          index: index
        })
        format = format.replace(types[i], '##'.substring(0, types[i].length))
      }
    }
    effectiveTypes = sortBy(effectiveTypes, function (item) {
      return item.index
    })
    var effectiveTypesFlat = []
    for (let i = 0; i < effectiveTypes.length; i++) {
      effectiveTypesFlat.push(effectiveTypes[i].type)
    }
    return effectiveTypesFlat
  },
  getStandardTimeFormat (pFormat) {
    var formats = this.getStandardTimeFormatArray(pFormat)
    var format = ''
    for (var i = 0; i < formats.length; i++) {
      format += formats[i]
      if (i < formats.length - 1) {
        format += ':'
      }
    }
    return format
  },
  separateDateAndTimeFormat (pFormat) { // 将一个完整的日期时间格式分离成单独的日期格式和时间格式
    var timeFormat = undefined
    var dateFormat = undefined
    if (pFormat.indexOf('HH') > -1) {
      dateFormat = trim(pFormat.split('HH')[0])
      timeFormat = trim('HH' + pFormat.split('HH')[1])
    } else if (pFormat.indexOf('H') > -1) {
      dateFormat = trim(pFormat.split('H')[0])
      timeFormat = trim('H' + pFormat.split('H')[1])
    }
    return {
      time: timeFormat,
      date: dateFormat
    }
  },
  resolveDataStamp: function (timeStamp) {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const monthTwo = month < 10 ? ('0' + month) : month
    const day = date.getDate()
    const dayTwo = day < 10 ? ('0' + day) : day
    const week = date.getDay()
    const hours = date.getHours()
    const hoursTwo = hours < 10 ? ('0' + hours) : hours
    const minutes = date.getMinutes()
    const minutesTwo = minutes < 10 ? ('0' + minutes) : minutes
    const seconds = date.getSeconds()
    const secondsTwo = seconds < 10 ? ('0' + seconds) : seconds
    const milliseconds = date.getMilliseconds()
    const weekChineseArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekChineseShortArr = ['日', '一', '二', '三', '四', '五', '六']
    return {
      year: year,
      month: month,
      monthTwo: monthTwo,
      day: day,
      dayTwo: dayTwo,
      week: week,
      weekChinese: weekChineseArr[week],
      weekChineseShort: weekChineseShortArr[week],
      hours: hours,
      hoursTwo: hoursTwo,
      minutes: minutes,
      minutesTwo: minutesTwo,
      seconds: seconds,
      secondsTwo: secondsTwo,
      milliseconds: milliseconds
    }
  },
  dateFormat (dataString, format) {
    const dateObj = this.resolveDataStamp(dataString)
    let timeShow = format
    timeShow = timeShow.replace('yyyy', dateObj.year)
    timeShow = timeShow.replace('MM', dateObj.monthTwo)
    timeShow = timeShow.replace('dd', dateObj.dayTwo)
    timeShow = timeShow.replace('M', dateObj.month)
    timeShow = timeShow.replace('d', dateObj.day)
    timeShow = timeShow.replace('HH', dateObj.hoursTwo)
    timeShow = timeShow.replace('mm', dateObj.minutesTwo)
    timeShow = timeShow.replace('ss', dateObj.secondsTwo)
    timeShow = timeShow.replace('H', dateObj.hours)
    timeShow = timeShow.replace('m', dateObj.minutes)
    timeShow = timeShow.replace('s', dateObj.seconds)
    return timeShow
  }
}
export default date
