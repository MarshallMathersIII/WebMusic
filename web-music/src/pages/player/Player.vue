<template>
  <div class="content">
    <!-- 普通播放 -->
    <div class="normal-player" v-show="fullScreen">
      <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
      <!-- 唱盘主义 -->
      <div class="vinyl-content">
        <div class="stylus">
          <div class="spot"></div>
          <img src="../../assets/img/stylus.png" :class="[playing?playClass:stopClass]" />
        </div>
        <div class="vinyl" :class="vinylPlay">
          <img :src="currentSong.al.picUrl" alt class="vinyl-pic" />
        </div>
      </div>
      <!-- 喜欢/下载/评论 -->
      <div class="btn-wapper">
        <i class="iconfont icon-xihuan1"></i>
        <i class="iconfont icon-xiazai1"></i>
        <i class="iconfont icon-pinglun1"></i>
        <i class="iconfont icon-gengduo1"></i>
      </div>
      <!-- 播放时间进度条 -->
      <div class="palyer-progress"></div>
      <!-- 播放控制栏 -->
      <div class="palyer">
        <i class="iconfont icon-suijibofang" @click="playMode"></i>
        <i class="iconfont icon-shangyishouxianxing" @click="prePlay"></i>
        <i @click="changePlaying" :class="playIcon"></i>
        <i class="iconfont icon-xiayishouxianxing" @click="nextPlay"></i>
        <i class="iconfont icon-juxing"></i>
      </div>
    </div>
    <!-- 迷你播放 -->
    <div class="mini-player" v-show="!fullScreen" :style="{bottom:bottomHeight + 'px'}">
      <div class="mini-vinyl" :class="vinylPlay">
        <img class="song-img" :src="currentSong.al.picUrl" @click="setFullScreen" />
      </div>
      <span class="song-name" @click="setFullScreen">{{currentSong.name}}</span>
      <i @click="changePlaying" :class="playIcon"></i>
      <i class="iconfont icon-juxing"></i>
    </div>
    <!--TODO audio属性补充使用 -->
    <audio id="music-audio" ref="audio" autoplay :src="songUrl"></audio>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/api/api.js";
import TitleBar from "@/components/TitleBar";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Player",
  components: {
    TitleBar
  },
  props: {
    isBottom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      milddleTip: "播放组件",
      phone: "",
      playClass: "play",
      stopClass: "stop",
      songReady: false,
    };
  },
  computed: {
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "songUrl"
    ]),
    vinylPlay() {
      return this.playing ? "vinyl-play" : "vinyl-stop";
    },
    playIcon() {
      return this.playing ? "iconfont icon-zanting" : "iconfont icon-bofang";
    },
     bottomHeight() {
      return this.isBottom ? "0" : "60";
    }
  },
  methods: {
    setFullScreen() {
      this.setFullScreen(true);
    },
    leftClickBtn() {
      this.setFullScreen(false);
    },
    playMode() {},
    nextPlay() {
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      this.getSongUrlFn(this.currentSong.id);
      this.setPlayingState(true);
    },
    prePlay() {
      console.log(this.bottomHeight)
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      this.getSongUrlFn(this.currentSong.id);
      this.setPlayingState(true);
    },
    changePlaying() {
      if (this.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.setPlayingState(!this.playing);
    },
    getSongUrlFn(id) {
      api
        .getSongUrlFn(id)
        .then(result => {
          console.log(result.data);
          this.setSongUrl(result.data.data[0].url);
          console.log(result.data.data[0].url);
        })
        .catch(err => {});
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setSongUrl: "SET_SONG_URL"
    })
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  .normal-player
    background-color #ffffff
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 3000
  .vinyl-content
    width 100%
    display flex
    align-items center
    justify-content flex-start
    flex-direction column
  .stylus
    display flex
    align-items center
    justify-content flex-start
    flex-direction column
    z-index 1000
    .spot
      position relative
      top 15px
      z-index 2000
      width 30px
      height 30px
      border-radius 50%
      background-color pink
    .stop
      margin-left 70px
      height 140px
      width 100px
      transform translate(20px, 0)
      transform rotate(-15deg)
      transform-origin top left // 原点设置
      transition transform 0.2s
    .play
      margin-left 70px
      height 140px
      width 100px
      transform translate(20px, 0)
      transform rotate(0deg)
      transform-origin top left // 原点设置
      transition transform 0.2s
  .vinyl
    position relative
    bottom 60px
    height 300px
    width 300px
    background url('../../assets/img/vinyl.png')
    background-size 300px 300px
    display flex
    align-items center
    justify-content center
    &.vinyl-play
      animation palying 14s infinite linear
    &.vinyl-stop
      animation-play-state stop
  img
    height 200px
    width 200px
    border-radius 50%
  .btn-wapper
    height 40px
    display flex
    justify-content space-around
    align-items center
    i
      font-size 24px
      color black
  .palyer-progress
    background-color pink
    height 30px
  .palyer
    position fixed
    bottom 0
    width 100%
    display flex
    justify-content space-around
    align-items center
    padding 20px 0px
    i
      margin-top 16px
      font-size 28px
      color $color-theme
    :nth-child(3)
      font-size 40px
.mini-player
  height 50px
  width 100%
  background-color $color-background-grey
  position fixed
  justify-content space-between
  align-items center
  display flex
  padding 0 10px
  border-top 1px solid rgba(0, 0, 0, 0.2)
  .mini-vinyl
    background url('../../assets/img/vinyl.png')
    background-size cover
    width 50px
    height 50px
    border-radius 50%
    margin-bottom 16px
    display flex
    justify-content center
    align-items center
    &.vinyl-play
      animation palying 14s infinite linear
    &.vinyl-stop
      animation-play-state stop
  .song-img
    width 34px
    height 34px
    border-radius 50%
  .song-name
    flex 5
    margin-left 10px
    no-wrap()
  i
    flex 1
    font-size 24px
@keyframes palying
  0%
    -webkit-transform rotate(0deg)
    transform rotate(0deg)
  100%
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
</style>