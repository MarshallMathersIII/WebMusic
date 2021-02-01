//state只存放基础数据，getters等价于计算属性，可根据state基础数据计算其他值

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}
export const songUrl = state => state.songUrl

export const popShow = state => state.popShow