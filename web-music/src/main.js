// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//初始样式重置（index.styl已引入）
// import './assets/styles/reset.css'
import './assets/styles/border.css'
//全局stylus引入
import './assets/styles/index.styl'
//使用 astClick移动端300毫秒点击延时问题
import fastClick from 'fastclick'
import {NavBar,ActionSheet, Dialog,ShareSheet,Search, Toast, Field, Tab, Tabs, Popup, Divider, Skeleton } from 'vant';
//轮播组件
import VueAwesomeSwiper from 'vue-awesome-swiper'
//懒加载
import VueLazyload from 'vue-lazyload'
//移动端适配
import 'postcss-pxtorem'

// swipper必须
require('swiper/dist/css/swiper.css')
Vue.use(Toast);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Field);
Vue.use(Search);
Vue.use(Popup);
Vue.use(Divider);
Vue.use(Skeleton);
Vue.use(ShareSheet);
Vue.use(Dialog);
Vue.use(ActionSheet);
Vue.use(NavBar);

// Vue.use(VueLazyload)  // 不带参数注册指令
Vue.use(VueLazyload, {
  preLoad: 1, //预加载的宽高比
  error: require('assets/img/lazy_load.png'), //图片加载失败时使用的图片源
  attempt: 3, //尝试加载次数
  loading: require('assets/img/lazy_load.png') //图片加载的路径
})

fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
fastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
