import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//vuex插件，查看修改记录
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//测试环境执行严格模式strict
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, //检测state修改是否来源于commit mutations
  plugins: debug ? [createLogger()] : []
})