import Vue from 'vue'
import Router from 'vue-router'
import EndLogin from '../components/login_module/EndLogin'
import main from '../components/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EndLogin',
      component: EndLogin
    },
    {
      path: '/main',
      name: 'Main',
      component: main
    }
  ],
  mode: 'history'
})
