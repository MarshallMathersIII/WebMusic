import { palyMode } from 'base/config'
const state = {
  loginState: '',//登录状态
  token: "",
  profile: {},//个人基本信息
  isAppending: false,//loading状态

  playlist: [],//播放歌单列表
  playing: false,
  fullScreen: false,
  sequenceList: [],
  mode: palyMode.sequence,
  currentIndex: -1,
  songUrl:''
}

export default state