import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index'
import qs from "qs";


import {songDeatil, artistSongs, artistTopSong, suggestSearch, defaultSearch, hotSearchList, artistAlbum, artistDetail, artistSong, getAlbum, likeMusic, checkMusic, songUrl, playlistDetail, djBanner, djPerfered, djPaygift, homepage, logout, userPlayList, likeList, loginStatus, phoneRegistered, phoneLogin, bannerSwiper, playList, newDish, topSong, newSongs, newAlbum, recommendSong } from './config.js'

import { Toast } from 'vant';

export default {
    //歌手全部歌曲
    artistSongsFn(id, order, limit, offset) {
        return axios.get(artistSongs, {
            params: {
                id, order, limit, offset
            }
        })
    },
    //搜索提示
    //必选参数 : keywords : 关键词
    //可选参数 : type : 如果传 'mobile' 则返回移动端数据
    suggestSearchFn(keywords, type) {
        return axios.get(suggestSearch, {
            params: {
                keywords, type
            }
        })
    },
    // 默认搜素
    defaultSearchFn() {
        return axios.get(defaultSearch)
    },
    //热搜榜
    hotSearchListFn() {
        return axios.get(hotSearchList)
    },
    /**
     获取歌手专辑
     说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
     必选参数 : id: 歌手 id
     可选参数 : limit: 取出数量 , 默认为 50
     offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
    */
    artistAlbumFn(id, limit, offset) {
        return axios.get(artistAlbum, {
            params: {
                id, limit, offset
            }
        })
    },
    artistDetailFn(id) {
        return axios.get(artistDetail, {
            params: {
                id
            }
        })
    },
    artistTopSongFn(id) {
        return axios.get(artistTopSong, {
            params: {
                id
            }
        })
    },
    getAlbumFn(id) {
        return axios.get(getAlbum, {
            params: {
                id
            }
        })
    },
    likeMusicFn(id, like) {
        return axios.get(likeMusic, {
            params: {
                id, like
            }
        })
    },
    getSongUrlFn(id, br) {
        return axios.get(songUrl, {
            params: {
                id, br
            }
        })
    },
    /**
     * 音乐是否可用
     * 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
     */
    checkMusicFn(id, br) {
        return axios.get(checkMusic, {
            params: {
                id, br
            }
        })
    },
    // 歌单详情
    playlistDetailFn(id, s) {
        return axios.get(playlistDetail, {
            params: {
                id, s
            }
        })
    },
    //电台baner
    djBannerFn() {
        return axios.get(djBanner)
    },
    //电台baner
    djPerferedFn() {
        return axios.get(djPerfered)
    },
    //电台baner
    djPaygiftFn() {
        return axios.get(djPaygift)
    },
    //发现页面
    homepageFn(refresh) {
        return axios.get(homepage, {
            params: {
                refresh
            }
        })
    },
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
    //新碟
    newDishFn(offset,limit) {
        return axios.get(newDish, {
            params: {
                offset,
                limit
            }
        })
    },
    //新歌
    topSongFn(type = "ALL",limit=3) {
        return axios.get(topSong, {
            params: {
                type,limit
            }
        })
    },
    //数字专辑
    newAlbumFn() {
        return axios.get(newAlbum)
    },
    //每日推荐歌单
    recommendSongFn() {
        return axios.get(recommendSong)
    },
     //新歌
    topSongFn(type = "ALL",limit=3) {
        return axios.get(topSong, {
            params: {
                type,limit
            }
        })
    },
      //新歌
      songDeatilFn(ids) {
        return axios.get(songDeatil, {
            params: {
                ids
            }
        })
    },
}


//请求超时时间
axios.defaults.timeout = 30000
//请求头设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 定时器数组，一般我们都是等请求时间超过1秒后，才出现loading状态，如果一开始就提示，用户体验也不是很好
let timers = [],
    timer = null;
function clearAllTimer() {
    timers.forEach(item => {
        clearTimeout(item);
    });
    timers = [];
}
//拦截请求
axios.interceptors.request.use((request) => {
    //1秒内请求不显示loading
    timer = setTimeout(() => {
        !store.state.isAppending && store.commit("SET_APPENDING", true);
    }, 1000);
    timers.push(timer);
    let REQUEST_DATA = request.data
    //统一进行qs模块转换
    request.data = qs.stringify(REQUEST_DATA)
    return request;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            clearAllTimer();
            store.commit("SET_APPENDING", false);
            console.log(response)
            return Promise.resolve(response);
        } else {
            clearAllTimer();
            store.commit("SET_APPENDING", false);
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        clearAllTimer();
        store.commit("SET_APPENDING", false);
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
            case 400:
                Toast({
                    message: '请求参数错误',
                    duration: 1000,
                    forbidClick: true,
                    position: 'bottom',
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




