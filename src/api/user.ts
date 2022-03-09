import request from '@/utils/request'
import { loginData } from '@/env'

export const login =
  (data: loginData) => request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data
  })

// 获取用户详细信息
export function getUserInfo () {
  return request({
    url: '/getUserInfo',
    method: 'get'
  })
}

export const getRouters =
  () => request({
    url: '/getRouters',
    method: 'get'
  })

export const logout =
  () => request({
    url: '/logout',
    method: 'post'
  })
