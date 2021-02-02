import Vue from 'vue'
import Router from 'vue-router'
import FriendHome from 'pages/friends/FriendHome'
import MineHome from 'pages/mine/MineHome'
import VideoHome from 'pages/video/VideoHome'
import RadioHome from 'pages/radio/RadioHome'
import FindHome from 'pages/find/FindHome'
import LoginHome from 'pages/login/LoginHome'
import PhonePwd from 'pages/login/PhonePwd'
import ListHome from 'pages/songlist/ListHome'
import SingerHome from 'pages/singer/SingerHome'




Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/SingerHome',
      name: 'SingerHome',
      component: SingerHome
    },
    {
      path: '/PhonePwd',
      name: 'PhonePwd',
      component: PhonePwd
    },
    {
      path: '/LoginHome',
      name: 'LoginHome',
      component: LoginHome,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      redirect: '/FindHome',
      meta: {
        keepAlive: true,
        footShow: true,
      }
    },

    {
      path: '/FriendHome',
      name: 'FriendHome',
      component: FriendHome,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/MineHome',
      name: 'MineHome',
      component: MineHome,
      meta: {
        keepAlive: true,
        footShow: true,
      }
    },
    {
      path: '/RadioHome',
      name: 'RadioHome',
      component: RadioHome,
      meta: {
        keepAlive: true,
        footShow: true,
      }
    },
    {
      path: '/FindHome',
      name: 'FindHome',
      component: FindHome,
      meta: {
        keepAlive: true, // 不需要被缓存
        footShow: true,
      }
    },
    {
      path: '/VideoHome',
      name: 'VideoHome',
      component: VideoHome,
      meta: {
        keepAlive: true,
        footShow: true,
      }
    },
    {
      path: '/ListHome',
      name: 'ListHome',
      component: ListHome,
      meta: {
        keepAlive: true
      }
    }

  ]
})


/**导航守卫使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆 */
router.beforeEach((to, from, next) => {
  let loginState = localStorage.getItem('loginState');
  if (to.path === '/FindHome' || to.path === '/MineHome' || to.path === '/PhonePwd' || to.path === '/LoginHome' || to.path === '/RadioHome' || to.path === '/VideoHome' || to.path === '/ListHome') {
    next();
    return;
  }
  if (loginState == null || loginState === '') {
    next('/LoginHome');
    return;
  }
  next();
})

export default router;
