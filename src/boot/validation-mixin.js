import * as methods from 'vuelidate/lib/validators'
import { date } from 'quasar'

export default ({ Vue }) => {
  Vue.prototype.$rules = {
    is(value, message) {
      message = message !== undefined ? message : false
      return (val) => {
        let result
        switch (typeof value) {
          case 'string':
            result = String(val) === value
            break
          case 'number':
            result = Number(val) === value
            break
          default:
            result = val === value
        }
        return result || message
      }
    },
    required(message = 'Field is Required.') {
      return (val) => methods.required(val) || message
    },
    email(message = 'Please enter valid email.') {
      return (val) => methods.email(val) || message
    },
    validateZip(message = 'Please enter valid zip code.') {
      return (val) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(val) || message
    },
    validatePhone(message = 'Please enter valid phone.') {
      return (val) =>
        val
          ? /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val) ||
            message
          : true
    },

    minLength(length, message) {
      message = message !== undefined ? message : false
      return (val) => methods.minLength(length)(val) || message
    },
    maxLength(length, message = 'Only 10 Guest allowed for Accommodation') {
      message = message !== undefined ? message : false
      return (val) => {
        console.log(val, message)
        return methods.maxLength(length)(val) || message
      }
    },
    minValue(value, message) {
      message = message !== undefined ? message : false
      return (val) => methods.minValue(value)(val) || message
    },
    maxValue(value, message) {
      message = message !== undefined ? message : false
      return (val) => methods.maxValue(value)(val) || message
    },
    between(min, max, message) {
      message = message !== undefined ? message : false
      return (val) => methods.between(min, max)(val) || message
    },
    alpha(message = false) {
      return (val) => methods.alpha(val) || message
    },
    alphaNum(message = false) {
      return (val) => methods.alphaNum(val) || message
    },
    numeric(message = 'Please enter numeric values only') {
      return (val) => methods.numeric(val) || message
    },
    integer(message = false) {
      return (val) => methods.integer(val) || message
    },
    decimal(message = false) {
      return (val) => methods.decimal(val) || message
    },

    ipAddress(message = false) {
      return (val) => methods.ipAddress(val) || message
    },
    macAddress(separator = ':', message = false) {
      return (val) => methods.macAddress(separator)(val) || message
    },
    url(message = false) {
      return (val) => methods.url(val) || message
    },
    or(...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return (val) => methods.or(...args)(val) || message
    },
    and(...args) {
      let message = false
      if (typeof args[args.length - 1] === 'string') {
        message = args.pop()
      }
      return (val) => methods.and(...args)(val) || message
    },
    not(rule, message = false) {
      return (val) => methods.not(rule)(val) || message
    },
    sameAs(locator, message = false) {
      return (val) => val == locator || message
    },
    isValidDate(message = 'Enter valid date.') {
      return (val) => {
        if (val)
          return (
            /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
              val
            ) || message
          )
        return true
      }
    },
    isValidDOB(message = 'Enter valid dob.') {
      return (val) => {
        if (val) {
          let splitDob = val.split('/')
          if (splitDob.length >= 3) {
            return (
              date.getDateDiff(
                new Date(`${splitDob[1]}/${splitDob[0]}/${splitDob[2]}`),
                new Date(),
                'days'
              ) < 0 || message
            )
          }
        }
        return true
      }
    },
    onlyFutureDates(includeToday = true, message = 'Enter only future date.') {
      return (val) => {
        if (val) {
          let splitDob = val.split('/')
          if (splitDob.length >= 3) {
            let diff = date.getDateDiff(
              new Date(`${splitDob[1]}/${splitDob[0]}/${splitDob[2]}`),
              new Date(),
              'days'
            )
            if (includeToday) return diff >= 0 || message

            return diff > 0 || message
          }
        }
        return message
      }
    },
  }
}
