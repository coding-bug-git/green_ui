import { store } from '@/store'
import router from '@/router'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import { ROUTE_WHITE_LIST } from '@/utils/constant'
import { isHttp } from '@/utils/validate'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

NProgress.configure({ showSpinner: false })
router.beforeEach((to: RouteLocationNormalized, from, next) => {
  NProgress.start()
  if (getToken()) {
    document.title = to.meta.title as string ?? import.meta.env.VITE_APP_TITLE
    // to.meta.title ? (document.title = to.meta.title as string) : (document.title = import.meta.env.VITE_APP_TITLE)

    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log(store.getters['user/Roles'].length)
      if (store.getters['user/Roles'].length === 0) {
        store.dispatch('user/GetUserInfo').then(() => {
          store.dispatch('user/GenerateRoutes').then((accessRoutes: RouteRecordRaw[]) => {
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach(route => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
            .catch(err => {
              store.dispatch('user/Logout').then(() => {
                ElMessage.error(err)
                next({ path: '/' })
              })
            })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token
    if (ROUTE_WHITE_LIST.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  NProgress.done()
})
