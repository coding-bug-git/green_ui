import axios from 'axios'
import { getToken } from '@/utils/auth'
import { tansParams } from '@/utils/common'
import { ERROR_CODE } from '@/utils/constant'
import { store } from '@/store'
import cache from '@/utils/cache'
import _ from 'lodash'

const env = import.meta.env

// 是否显示重新登录
export let isRelogin = { show: false }

const request = axios.create({
  timeout: 10000,
  baseURL: env.VITE_APP_BASE_API as string,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request拦截器
request.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = !(config.headers?.isToken === false)
  // 是否需要防止数据重复提交
  const isRepeatSubmit = !(config.headers?.repeatSubmit === false)
  if (getToken() && isToken) {
    config.headers!.Authorization = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }

  if (isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (_.isEmpty(sessionObj)) {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const { url, data, time } = sessionObj
      const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
      if (data === requestObj.data && requestObj.time - time < interval && url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交'
        console.warn(`[${url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  const msg = ERROR_CODE[code as keyof typeof ERROR_CODE] || res.data.msg || ERROR_CODE.default
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true
      ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        isRelogin.show = false
        store.dispatch('Logout').then(() => {
          location.href = '/index'
        })
      }).catch(() => {
        isRelogin.show = false
      })
    }
    return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
  } else if (code === 500) {
    ElMessage({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    ElNotification.error({
      title: msg
    })
    return Promise.reject(new Error('error'))
  } else {
    return Promise.resolve(res.data)
  }
},
error => {
  console.log('err' + error)
  let { message } = error
  if (message === 'Network Error') {
    message = '后端接口连接异常'
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时'
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常'
  }
  ElMessage({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

// request.interceptors.response.use((response) => {
//   let res = response.data
//   if (response.config.responseType === 'blob') {
//     return res
//   }
//   console.log(response.data)
//   if (typeof res === 'string') {
//     res = res ? JSON.parse(res) : res
//   }
//   ElNotification({
//     title: 'Title',
//     message: h('i', { style: 'color: teal' }, JSON.stringify(response))
//   })
//   if (res.code === 200) {
//     return res
//   } else {
//     ElMessage.error(res.msg ? res.msg : '系统异常')
//     return Promise.reject(res.msg)
//   }
// }, error => {
//   console.log('err' + error)
//   if (error.response.data) {
//     error.message = error.response.data.msg
//   }
//   if (error.response.status === 401) {
//     router.push('user')
//   }
//   ElMessage.error({ message: error.message, duration: 3000 })
//   return Promise.reject(error)
// })

export default request
