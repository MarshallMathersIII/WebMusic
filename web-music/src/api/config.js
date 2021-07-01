
const api = process.env.NODE_ENV === 'development' ? '/api' : ''

//发现模块
export const bannerSwiper = api + '/banner?type=1' // 请求发现页面轮播图
export const playList = api + '/top/playlist' // 推荐歌单，歌单广场
export const recommendSong = api + '/recommend/resource' // 获取每日推荐歌单，登录内
export const topSong = api + '/top/song' // 发现页新歌
export const newDish = api + '/top/album' // 发现页新碟
export const newAlbum = api + '/album/newest' //  最新专辑
export const homepage = api +'/homepage/block/page'

export const songDeatil = api + '/song/detail' //  歌曲详情


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
export const likeMusic = api + '/like' // 喜欢歌曲

//歌手
export const artistTopSong = api + '/artist/top/song' // 歌手热门50
export const artistDetail = api + '/artist/detail' // 获取歌手详情(暂不可用)
export const artistAlbum = api + '/artist/album' // 歌手专辑
export const getAlbum = api + '/album' // 获取专辑内容
export const artistSongs = api + '/artist/songs' // 歌手热门50


//搜索
export const hotSearchList = api + '/search/hot/detail' // 热搜列表
export const search = api + '/search' // 搜索关键词
export const defaultSearch = api + '/search/default' // 默认搜索关键词
export const suggestSearch = api + '/search/suggest' // 搜索建议








