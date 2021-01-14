
const api = process.env.NODE_ENV === 'development' ? '/api' : ''

//发现模块
export const bannerSwiper = api + '/banner?type=1' // 请求发现页面轮播图
export const playList = api + '/top/playlist' // 推荐歌单，歌单广场
export const recommendSong = api + '/recommend/resource' // 获取每日推荐歌单


export const newDish = api + '/top/album' // 发现页新碟
export const getDishInfo = api + '/album' // 获取专辑内容
export const newSongs = api + '/top/song' // 发现页新歌
export const newAlbum = api + '/album/newest' // 发现页新歌

//登录模块
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const phoneLogin = api + '/login/cellphone' // 手机号登陆
export const loginStatus = api + '/login/status' // 手机号登陆


