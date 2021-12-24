import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import Cookie from 'js-cookie'
// import { encode } from 'querystring'
import Home from '@/views/Home.vue'
import Quality from '@/views/Quality.vue'
import Vuex from '@/views/Vuex.vue'
import Test from '@/views/Test.vue'
import pns from '@/views/pns.vue'
import getpro from '@/views/getpro.vue'
import common from '@/views/common.vue'

import 'nprogress/nprogress.css'
import { store } from '@/store'
import { Session } from '@/utils/storage'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Quality',
    name: 'Quality',
    component: Quality,
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex,
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/Axios.vue'), // 懒加载 Axios 组件
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/pns',
    name: 'pns',
    component: pns,
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/proback',
    name: 'proback',
    component: getpro,
    meta: {
      requireAuth: true // 需要登录才能访问
    }
  },
  {
    path: '/404',
    name: '404',
    component: common
  }
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
]

// NProgress.configure({ showSpinner: false })
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由加载前
router.beforeEach(async (to, from, next) => {
  if (to.matched.length === 0) {
    // 如果未匹配到路由
    next('/404')
  } else {
    next() // 如果匹配到正确跳转
  }

  NProgress.configure({ showSpinner: false })
  // console.log('to: ', to, 'from: ', from, 'next: ', next)
  if (to.name) NProgress.start()
  if (to.meta.requireAuth) {
    const gitlabToken = Cookie.get('username')
    // console.log(gitlabToken)
    if (!gitlabToken) {
      const nextUrl = `https://dashboard-mng.bilibili.co/login.html?caller=172.16.39.188:8689`
      Session.clear()
      NProgress.done()
      window.location.href = nextUrl
    } else {
      // 已拿到登陆成功信息，尝试写入cookie和session，和登陆用户信息到store
      if (!Session.get('username')) {
        Session.set('username', gitlabToken)
        const loginUserName = Cookie.get('username') || 'admin'
        store.state.name = loginUserName
      }
      // 前往请求页面
      next()
      NProgress.done()
    }
  } else {
    next()
    NProgress.done()
  }
})

// 路由加载后
router.afterEach(() => {
  NProgress.done()
})

export default router
