import { Cookies } from 'quasar'

// Attention to this to secure your cookies!
const options = {
  // sameSite: 'Strict',
  // secure: true,
  path: '/',
  expires: 1,
}

const encode = encodeURIComponent

export { Cookies }

export default class CookieStorage {
  constructor(cookies) {
    this.cookies = cookies
  }

  setItem(key, value) {
    this.cookies.set(encode(key), value, options)
  }

  getItem(key) {
    return JSON.stringify(this.cookies.get(encode(key))) //, { doNotParse: true });
  }

  removeItem(key) {
    this.cookies.remove(encode(key), options)
  }

  key(index) {
    const allKeys = Object.keys(this.cookies.getAll())
    return index > -1 && index <= allKeys.length ? allKeys[index] : ''
  }
}
