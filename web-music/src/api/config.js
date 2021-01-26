
const api = process.env.NODE_ENV === 'development' ? '/api' : ''

//发现模块
export const bannerSwiper = api + '/banner?type=1' // 请求发现页面轮播图
export const playList = api + '/top/playlist' // 推荐歌单，歌单广场
export const recommendSong = api + '/recommend/resource' // 获取每日推荐歌单，登录内
export const topSong = api + '/top/song' // 发现页新歌

export const newDish = api + '/top/album' // 发现页新碟
export const getDishInfo = api + '/album' // 获取专辑内容
export const newAlbum = api + '/album/newest' // 发现页新歌/homepage/block/page

export const homepage = api +'/homepage/block/page' //TODO首页数据接口，暂不可用，用以上三接代替，后续修改

//电台模块
export const djBanner = api + '/dj/banner' // 电台页面的轮播图
export const djPerfered = api + '/dj/today/perfered' // 电台推荐数据
export const djPaygift = api + '/dj/paygift' // 电台精品推荐


//登录模块
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const phoneLogin = api + '/login/cellphone' // 手机号登陆
export const loginStatus = api + '/login/status' // 手机号登陆
export const logout = api + '/logout' // 退出登录

//我的模块
export const likeList = api + '/likelist' // 我喜欢的音乐
export const userPlayList = api + '/user/playlist' // 获取用户歌单（登录内）


//歌单详情
export const playlistDetail = api + '/playlist/detail' // 获取歌单详情


//歌曲播放
export const songUrl = api + '/song/url' // 获取歌曲url
export const checkMusic = api + '/check/music' // 查看歌曲是否可用
