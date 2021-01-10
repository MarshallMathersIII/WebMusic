
const api = process.env.NODE_ENV === 'development' ? '/api' : ''

//登录模块
export const phoneRegistered = api + '/cellphone/existence/check' // 手机号是否被注册
export const phoneLogin = api + '/login/cellphone' // 手机号登陆


