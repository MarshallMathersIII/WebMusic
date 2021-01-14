import * as types from './mutation-types'
const mutations = {
  [types.SET_LOGIN_STATE](state, loginState) {
    state.loginState = loginState
    localStorage.setItem("loginState", loginState)
  },
  [types.SET_TOKEN](state, token) {
    state.token = token
    localStorage.setItem("token", token)
  },
  [types.SET_PROFILE](state, profile) {
    state.profile = profile
    localStorage.setItem("profile", profile)
  }
}

export default mutations