import { UserState } from '@/store/user/types'
import { ActionContext } from 'vuex'

import { login, getUserInfo, getRouters, logout } from '@/api/user'
import { removeToken, setToken } from '@/utils/auth'

const state = (): UserState => ({
  userInfo: null,
  token: ''
})
// getters
const getters = {
  Roles: (state: UserState) => state.userInfo?.userRoles || []
}

// actions
const actions = {
  Login ({ commit, state }: ActionContext<UserState, any>, payload: any) {
    return new Promise((resolve, reject) => {
      login(payload).then((res: any) => {
        setToken(res.data.token)
        commit('SET_TOKEN', res.data.token)
        resolve(res.token)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetUserInfo ({ commit, state }: ActionContext<UserState, any>, payload: any) {
    return new Promise((resolve, reject) => {
      getUserInfo().then((res: any) => {
        commit('SET_USERINFO', res.data.userInfo)
        resolve(res.token)
      }).catch(error => {
        reject(error)
      })
    })
  },
  GenerateRoutes ({ commit, state }: ActionContext<UserState, any>, payload: any) {
    return new Promise(resolve => {
      getRouters().then(res => {
        console.log(res)
        const sdata = JSON.parse(JSON.stringify(res.data))
        // const rdata = JSON.parse(JSON.stringify(res.data))
        // const defaultData = JSON.parse(JSON.stringify(res.data))
        // const sidebarRoutes = filterAsyncRouter(sdata)
        // const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        // const defaultRoutes = filterAsyncRouter(defaultData)
        // commit('SET_ROUTES', rewriteRoutes)
        // commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
        // commit('SET_DEFAULT_ROUTES', sidebarRoutes)
        // commit('SET_TOPBAR_ROUTES', defaultRoutes)
        // resolve(rewriteRoutes)
      })
    })
  },
  Logout ({ commit, state }: ActionContext<UserState, any>, payload: any) {
    return new Promise<void>((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// mutations
const mutations = {
  saveCurrentUser (state: UserState, payload: any) {
    state.userInfo = payload
  },
  SET_TOKEN (state: UserState, payload: string) {
    state.token = payload
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
// function filterAsyncRouter (asyncRouterMap: any, lastRouter = false, type = false) {
//   return asyncRouterMap.filter((route: any) => {
//     if (type && route.children) {
//       route.children = filterChildren(route.children)
//     }
//     if (route.component) {
//       // Layout ParentView 组件特殊处理
//       if (route.component === 'Layout') {
//         route.component = Layout
//       } else if (route.component === 'ParentView') {
//         route.component = ParentView
//       } else if (route.component === 'InnerLink') {
//         route.component = InnerLink
//       } else {
//         route.component = loadView(route.component)
//       }
//     }
//     if (route.children != null && route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children, route, type)
//     } else {
//       delete route.children
//       delete route.redirect
//     }
//     return true
//   })
// }
//
// function filterChildren (childrenMap, lastRouter = false) {
//   let children = []
//   childrenMap.forEach((el, index) => {
//     if (el.children && el.children.length) {
//       if (el.component === 'ParentView' && !lastRouter) {
//         el.children.forEach(c => {
//           c.path = el.path + '/' + c.path
//           if (c.children && c.children.length) {
//             children = children.concat(filterChildren(c.children, c))
//             return
//           }
//           children.push(c)
//         })
//         return
//       }
//     }
//     if (lastRouter) {
//       el.path = lastRouter.path + '/' + el.path
//     }
//     children = children.concat(el)
//   })
//   return children
// }

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
