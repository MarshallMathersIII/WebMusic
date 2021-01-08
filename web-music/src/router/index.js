import Vue from 'vue'
import Router from 'vue-router'
import Friends from './../pages/friends/friends'
import Mine from './../pages/mine/mine'
import Ktv from './../pages/ktv/ktv'
import Radio from './../pages/radio/radio'
import Find from './../pages/find/find'
import Login from './../pages/login/login'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path: '/',
      redirect: '/find'
    },

    {
      path:'/friends',
      name:'Friends',
      component:Friends
    },
    {
      path:'/mine',
      name:'Mine',
      component:Mine
    },
    {
      path:'/radio',
      name:'Radio',
      component:Radio
    },
    {
      path:'/find',
      name:'Find',
      component:Find
    },
    {
      path:'/ktv',
      name:'Ktv',
      component:Ktv
    }
  ]
})
