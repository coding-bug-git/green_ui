import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import Layout from '@/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test1',
        component: () => import('@/views/test1.vue')
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    children: [
      {
        path: 'role',
        component: () => import('@/views/sys/Role.vue')
      }, {
        path: 'menu',
        component: () => import('@/views/sys/Menu.vue')
      }, {
        path: 'user',
        component: () => import('@/views/sys/user.vue')
      }
    ]
  },

  // {
  //   path: '/user',
  //   component: () => import('@/views/Login.vue')
  // },
  // {
  //   path: '/test',
  //   component: () => import('@/views/test.vue')
  // },
  // {
  //   path: '/test1',
  //   component: () => import('@/views/test1.vue')
  // },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from) => {
//   next()
// })

export default router
