import axios from 'axios'
import router from '@/router/index'

import {logout, userPlayList, likeList, loginStatus, phoneRegistered, phoneLogin, bannerSwiper, playList, newDish, getDishInfo, newSongs, newAlbum, recommendSong } from './config.js'

import { Toast } from 'vant';

export default {
      //退出登录
      logoutFn() {
        return axios.get(logout)
    },
    //我喜欢的音乐
    userPlayListFn(uid, limit, offset) {
        return axios.get(userPlayList, {
            params: {
                uid, limit, offset
            }
        })
    },
    //我喜欢的音乐
    likeListFn(uid) {
        return axios.get(likeList, {
            params: {
                uid
            }
        })
    },
    //获取登录状态
    loginStatusFn() {
        return axios.get(loginStatus)
    },
    //手机号是否注册
    phoneRegisteredFn(phone) {
        return axios.get(phoneRegistered, {
            params: {
                phone
            }
        })
    },
    /**
   * 用户通过手机号/密码登录
   */
    phoneLoginFn(phone, password) {
        return axios.get(phoneLogin, {
            params: {
                phone: phone || '',
                password: password || ''
            }
        })
    },
    //发现页面轮播图
    bannerSwiperFn() {
        return axios.get(bannerSwiper)
    },
    //发现页面轮播图
    playListFn() {
        return axios.get(playList)
    },
    //新专辑
    newDishFn(limit = 10, offset) {
        return axios.get(newDish, {
            params: {
                limit,
                offset
            }
        })
    },
    //新歌
    newSongsFn(type = 0) {
        return axios.get(newSongs, {
            params: {
                type
            }
        })
    },
    //新碟
    newAlbumFn() {
        return axios.get(newAlbum)
    },
    //每日推荐歌单
    recommendSongFn() {
        return axios.get(recommendSong)
    },
}


//请求超时时间
axios.defaults.timeout = 30000

//请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        // if (error.response.status) {

        switch (error.response.status) {
            // 301: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 301:
                console.log('301')
                router.replace({
                    path: '/LoginHome',
                });
                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                console.log('403')
                break;
            // 404请求不存在
            case 404:
                Toast({
                    message: '404',
                    duration: 1000,
                    forbidClick: true,
                    position: 'bottom',
                });
                console.log('404')
                break;
            case 502:
                Toast({
                    message: '密码错误，请重新登录',
                    duration: 1000,
                    forbidClick: true,
                    position: 'bottom',
                });
                router.replace({
                    path: '/LoginHome',
                });
                console.log('502')
                break;
            // 其他错误，直接抛出错误提示
            default:
                console.log(error)
                break;
        }
        return Promise.reject(error.response);
        // }
    }
)




