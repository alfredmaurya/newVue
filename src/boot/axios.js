import axios from 'axios'
import { isEqualObject } from 'src/utils/index'

const { API_ROOT_URI } = process.env
let objRequests = {},
  routeName = null

export const axiosInstance = axios.create({
  baseURL: API_ROOT_URI,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const Requests = {
  del: (url, body) => {
    return axiosInstance.delete(url, body)
  },
  get: (url, params = {}) =>
    axiosInstance.get(url, {
      params,
    }),
  post: (url, body) => axiosInstance.post(url, body),
  put: (url, body) => axiosInstance.put(url, body),
}

export const setAxiosHeaders = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  localStorage.setItem("token",token)
}

export const clearRequest = (config) => {
  if (config && config.url && objRequests[config.url]) {
    let pageIndex = (config.params && config.params.page) || 0
    delete objRequests[config.url][pageIndex]
  }
}

export const setRouteName = (name) => {
  routeName = name
}

export const resetObjRequests = () => {
  for (let key in objRequests) {
    for (let page in objRequests[key]) {
      if (objRequests[key][page].cancel) objRequests[key][page].cancel()
    }
  }

  objRequests = Object.assign({})
}

export const createAxiosCancelSource = () => axios.CancelToken.source()

export const isCancelRequest = (error) => axios.isCancel(error)

export default ({ store }) => {
  axiosInstance.interceptors.request.use(
    function (config) {
      if (!routeName || config.method.toLocaleLowerCase() !== 'get') {
        return config
      }

      let axiosSource = createAxiosCancelSource()
      config.cancelToken = axiosSource.token

      let pageIndex = (config.params && config.params.page) || 0
      let oldParams = null

      if (objRequests[config.url]) {
        if (
          objRequests[config.url][pageIndex] &&
          objRequests[config.url][pageIndex].params
        ) {
          oldParams = objRequests[config.url][pageIndex].params
        } else {
          for (let page in objRequests[config.url]) {
            if (objRequests[config.url][page].params) {
              oldParams = objRequests[config.url][page].params
              break
            }
          }
        }
        if (oldParams !== null) {
          let blnIsSameRequest = isEqualObject(config.params || {}, oldParams)

          if (blnIsSameRequest) {
            if (
              objRequests[config.url][pageIndex] &&
              objRequests[config.url][pageIndex].cancel
            ) {
              objRequests[config.url][pageIndex].cancel()
            }
          } else {
            for (let page in objRequests[config.url]) {
              if (objRequests[config.url][page].cancel) {
                oldParams = objRequests[config.url][page].cancel()
                delete objRequests[config.url][page]
              }
            }
          }
        }
      }

      if (!objRequests[config.url]) {
        objRequests[config.url] = {}
      }

      objRequests[config.url][pageIndex] = {
        cancel: axiosSource.cancel,
        params: config.params || {},
      }

      return config
    },
    function (error) {}
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response && response.config) {
        clearRequest(response.config)
      }
      return response
    },
    (error) => {
      if (isCancelRequest(error)) {
        if (error.response && error.response.config) {
          clearRequest(error.response.config)
        }
        return null
      }

      if (error && error.response && 401 === error.response.status)
        store.dispatch('auth/logOut')

      return Promise.reject(
        error.response ? error.response.data || false : false
      )
    }
  )
}
