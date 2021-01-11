
const api = process.env.NODE_ENV === 'development' ? '/api' : ''

//发现模块
export const bannerSwiper = api + '/banner?type=1' // 请求发现页面轮播图


//登录模块
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const phoneLogin = api + '/login/cellphone' // 手机号登陆

