import { Loading } from 'quasar'

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const splashscreenShowHide = (show = false) => {
  if (typeof navigator !== 'undefined' && navigator.splashscreen) {
    if (show) navigator.splashscreen.show()
    else navigator.splashscreen.hide()
  }
}

export const reloadPage = () => {
  splashscreenShowHide(true)

  if (window.location.hash) {
    window.location.hash = '#/'
    window.location.reload()
  } else {
    window.location.assign('/')
  }
}

export const hideShowFullSpinner = (show = false, message = '') => {
  if (show) {
    Loading.show({
      spinnerSize: '3em',
      backgroundColor: 'grey-3',
      spinnerColor: 'primary',
      messageColor: 'primary',
      message: message,
    })
  } else {
    Loading.hide()
  }
}

export const convertArrayToObject = (array, key, identifier = '') => {
  if (array === null) {
    return {}
  }

  if (!Array.isArray(array)) {
    return array
  }

  return array.reduce((obj, item) => {
    let itemKey = item[key]

    return {
      ...obj,
      [identifier ? `${identifier}-${itemKey}` : itemKey]: item,
    }
  }, {})
}

export const isFunction = (functionToCheck) =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'

export const generateTimeSeries = (
  minuteInterval = 15,
  asObject = false,
  isEndTime = false,
  startTimeIndex = 0,
  start = 0,
  end = 1440
) => {
  let times = [],
    startTime = start,
    ap = [' AM', ' PM']

  if (asObject) times = {}
  //loop to increment the time and push results in array
  for (var i = 0; startTime < end; i++) {
    if (isEndTime) startTime += minuteInterval

    let hh = Math.floor(startTime / 60), // getting hours of day in 0-24 format
      mm = startTime % 60, // getting minutes of the hour in 0-55 format
      time = '',
      timeDisplay = ''

    if (hh == 24 && mm == 0) {
      timeDisplay = '11:59 PM'
      time = '23:59:59'
    } else {
      timeDisplay =
        ('0' + (hh == 0 ? 12 : hh % 12)).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ap[Math.floor(hh / 12)]

      time = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00'
    }
    // pushing data in array in [00:00 - 12:00 AM/PM format]

    if (asObject) {
      times[time] = {
        index: i,
        label: timeDisplay,
        value: time,
        inactive: isEndTime && i < startTimeIndex,
      }
    } else {
      times[i] = {
        index: i,
        label: timeDisplay,
        value: time,
        inactive: isEndTime && i < startTimeIndex,
      }
    }
    if (!isEndTime) startTime += minuteInterval

    if (!isEndTime && startTime >= end) break
  }

  return times
}

export const addMinutes = (time, interval) => {
  let timeMinutes = getMinutesFromTimeSting(time)

  timeMinutes += interval
  let hh = Math.floor(timeMinutes / 60),
    mm = timeMinutes % 60
  if (hh === 24 && mm === 0) return '23:59:59'
  return ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00'
}

export const getMinutesFromTimeSting = (timeString = '00:00:00') => {
  let splitTime = timeString.split(':'),
    minutes = 0
  if (splitTime[0]) minutes += parseInt(splitTime[0]) * 60
  if (splitTime[1]) minutes += parseInt(splitTime[1])

  return minutes
}

export const arrayIsEqual = (arr1, arr2) => {
  return (
    Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  )
}

export const toInteger = (value, defaultValue = NaN) => {
  const integer = parseInt(value, 10)
  return isNaN(integer) ? defaultValue : integer
}

export const requestAF =
  (typeof window !== 'undefined' &&
    (window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame)) ||
  // Fallback, but not a true polyfill
  // Only needed for Opera Mini
  /* istanbul ignore next */
  ((cb) => setTimeout(cb, 16))

export const toType = (val) => typeof val

export const isBoolean = (val) => toType(val) === 'boolean'

export const isNumeric = (value) => !isNaN(parseInt(value, 10))

export const sanitizeTitle = (title) => {
  let slug = ''
  // Change to lower case
  let titleLower = title.toLowerCase()
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
  // Letter "d"
  slug = slug.replace(/đ/gi, 'd')
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, '')
  // Change whitespace to "-"
  slug = slug.replace(/\s+/g, '-')

  return slug
}

export const getFullUrl = () =>
  `${location.protocol}//${location.hostname}${
    location.port ? ':' + location.port : ''
  }`

export const isEqualObject = (object1, object2) => {
  let arrKeys = Object.keys(object1)
  let excludeKeys = ['page', 'pageSize']

  if (arrKeys.length !== Object.keys(object2).length) return false

  if (!arrKeys.length) return true

  for (let key of excludeKeys) {
    let searchIndex = arrKeys.indexOf(key)

    if (searchIndex >= 0) {
      arrKeys.splice(searchIndex, 1)
    }
  }

  for (let key of arrKeys) {
    if (typeof object1[key] === 'object') {
      if (object2[key] && typeof object2[key] === 'object') {
        let isSame = isEqualObject(object1[key], object2[key])
        if (!isSame) {
          return false
        }
      } else {
        return false
      }
    } else if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}

// const myFun = function (a) {
//   this.a = a
// }

// myFun.prototype.myFirsrMethod = function () {}

// var instance = new myFun(2)
// instance.myFirsrMethod()
// var instance = new myFun(2)
// var instance = new myFun(2)
// var instance = new myFun(2)

// class MyClass {
//   constructor(a) {
//     this.a = a
//   }
//   myFirsrMethod() {
//     return this.a
//   }
// }

// var instance = new MyClass(2)

// ToDo: List in React, make use of static methods, Class Components, Symbols
