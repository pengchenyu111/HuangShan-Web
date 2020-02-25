// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import router from './router'
import '../style/theme/index.css'
// import {store} from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.use(VueAxios, axios)
// axios.defaults.baseURL = 'http://192.168.0.165:8088'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    App,
    ElementUI
  },
  template: '<App/>'
})
