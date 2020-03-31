import Vue from 'vue'
import Router from 'vue-router'
import EndLogin from '../components/login_module/EndLogin'
import main from '../components/main'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'EndLogin',
      component: EndLogin
    },
    {
      path: '/main',
      name: 'Main',
      component: main,
      meta: {
        requireAuth: true
      }
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('token') === 'true') {
      next()
    } else {
      // 未登录,跳转到登陆页面
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
