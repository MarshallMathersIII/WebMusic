import Vue from 'vue'
import Router from 'vue-router'
import FriendHome from './../pages/friends/FriendHome'
import MineHome from './../pages/mine/MineHome'
import KtvHome from './../pages/ktv/KtvHome'
import RadioHome from './../pages/radio/RadioHome'
import FindHome from './../pages/find/FindHome'
import LoginHome from './../pages/login/LoginHome'
import PhonePwd from './../pages/login/phonePwd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/PhonePwd',
      name: 'PhonePwd',
      component: PhonePwd
    },
    {
      path: '/LoginHome',
      name: 'LoginHome',
      component: LoginHome
    },
    {
      path: '/',
      redirect: '/FindHome'
    },

    {
      path: '/FriendHome',
      name: 'FriendHome',
      component: FriendHome
    },
    {
      path: '/MineHome',
      name: 'MineHome',
      component: MineHome
    },
    {
      path: '/RadioHome',
      name: 'RadioHome',
      component: RadioHome
    },
    {
      path: '/FindHome',
      name: 'FindHome',
      component: FindHome
    },
    {
      path: '/KtvHome',
      name: 'KtvHome',
      component: KtvHome
    }

  ]
})


/**导航守卫使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆 */
router.beforeEach((to, from, next) => {
  if (to.path === '/LoginHome') {
    next();
  } else if (to.path === '/FindHome') {
    next();
  }
  else if (to.path === '/MineHome') {
    next();
  } else {
    let loginState = localStorage.getItem('loginState');
    if (loginState == null || loginState === '') {
      next('/LoginHome');
    } else {
      next();
    }
  }
})

export default router;
