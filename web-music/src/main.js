// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//初始样式重置（index.styl已引入）
// import './assets/styles/reset.css'
import './assets/styles/border.css'
//全局stylus引入
import './assets/styles/index.styl'
//使用 astClick移动端300毫秒点击延时问题
import fastClick from 'fastclick'

Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
