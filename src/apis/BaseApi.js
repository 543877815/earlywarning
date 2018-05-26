import axios from 'axios'
import status from '@/constants/status'
import FormData from 'form-data'
import qs from 'qs'

const clientConfig = {
  // baseURL: 'http://192.168.100.152:8080',
  baseURL: '/api',
  timeout: 300000
}

export default class BaseApi {
  constructor () {
    this.client = this.getAxiosClient()
  }

  get (url, params = {}) {
    const options = Object.assign(
      {},
      {
        url,
        params,
        method: 'get'
      }
    )
    return this.request(options)
  }

  post (url, data = {}, type = 'json') {
    const options = Object.assign(
      {},
      {
        url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (type === 'json') {
      options.data = data
    } else if (type === 'form-data') {
      options.headers['Content-Type'] = 'multipart/form-data'
      const form = new FormData()
      const dataKey = Object.keys(data)
      for (let i = 0; i < dataKey.length; i++) {
        form.append(dataKey[i], data[dataKey[i]])
      }
      options.data = form
    } else {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.data = qs.stringify(data)
    }
    return this.request(options)
  }

  put (url, data = {}, type = 'json') {
    const options = Object.assign(
      {},
      {
        url,
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (type === 'json') {
      options.data = data
    } else if (type === 'form-data') {
      options.headers['Content-Type'] = 'multipart/form-data'
      const form = new FormData()
      const dataKey = Object.keys(data)
      for (let i = 0; i < dataKey.length; i++) {
        form.append(dataKey[i], data[dataKey[i]])
      }
      options.data = form
    } else {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.data = qs.stringify(data)
    }
    return this.request(options)
  }

  delete (url, data = {}) {
    const options = Object.assign(data, {
      url,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return this.request(options)
  }

  request (options) {
    return this.client.request(options)
  }

  getAxiosClient () {
    this.axiosClient = axios.create(clientConfig)
    this.axiosClient.interceptors.response.use(
      (response) => {
        console.log(response)
        if (response.data.ret !== 200) {
          const reject = {
            type: status[response.data.code] || '',
            ...response.data,
            system: '系统提醒'
          }
          return Promise.reject(reject)
        }
        return response.data
      },
      (err) => {
        console.log(err)
        const reject = {
          type: status.sys,
          code: err.response.status,
          msg: err.response.statusText,
          system: '系统提醒'
        }
        return Promise.reject(reject)
      }
    )
    return this.axiosClient
  }
}
