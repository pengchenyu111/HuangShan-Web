import Vue from 'vue'
import Vuex from 'vuex'
import state from './states.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
// 在state.js中写状态
// 在actions.js中写异步的操作，通常是向后端发请求
// 在mutations.js其他操作
export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
