import * as types from './mutation-types'
//mutations本质为函数
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
    localStorage.setItem("profile", JSON.stringify(profile))
  },
  [types.SET_APPENDING](state, isAppending) {
    state.isAppending = isAppending
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SONG_URL] (state, songUrl) {
    state.songUrl = songUrl
  },
  [types.SET_POP_SHOW] (state, popShow) {
    state.popShow = popShow
  },
   [types.SET_SEARCH_LIST] (state, list) {
    state.searchList = list
  },
}

export default mutations