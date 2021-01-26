<template>
  <div class="content" v-show="fullScreen">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <!-- 唱盘主义 -->
    <div class="vinyl-content">
      <div class="stylus">
        <div class="spot"></div>
        <img src="../../assets/img/stylus.png" :class="[playing?playClass:stopClass]" />
      </div>
      <div :class="[playing?vinyl:vinylStop]">
        <img :src="picUrl" alt class="vinyl-pic" />
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
    <!-- 播放器 -->
    <audio id="music-audio" ref="audio" autoplay></audio>
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
  data() {
    return {
      milddleTip: "播放组件",
      phone: "",
      playClass: "play",
      stopClass: "stop",
      vinyl: "vinyl",
      vinylStop: "vinyl-stop",
      songUrl: "",
      picUrl: "",
      show: true,
      id: "" //当前歌曲id
    };
  },
  mounted() {
    console.log("mounted");
    this.picUrl = this.currentSong.al.picUrl; //歌曲封面
    this.id = this.currentSong.id; //歌曲id
    this.getSongUrlFn(this.id);
  },
  created() {
    console.log("created");
  },
  computed: {
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList"
    ]),
    playIcon() {
      if (this.playing) {
        return "iconfont icon-zanting";
      } else {
        return "iconfont icon-bofang";
      }
    }
  },
  methods: {
    playMode() {},
    nextPlay() {
      console.log(this.playing);
      console.log(this.fullScreen);
      console.log(this.currentIndex);
      console.log(this.playlist);
      console.log(this.currentSong);
    },
    prePlay() {},
    changePlaying() {
      this.$refs.audio.src = this.songUrl;
      if (this.playing) {
        this.setPlayingState(false);
      } else {
        this.setPlayingState(true);
      }
      this.playing ? this.$refs.audio.play() : this.$refs.audio.pause();
      this.picUrl = this.currentSong.al.picUrl; //歌曲封面
      this.id = this.currentSong.id; //歌曲id
      this.getSongUrlFn(this.id);
    },
    leftClickBtn() {
      this.setFullScreen(false);
    },
    getSongUrlFn(id) {
      api
        .getSongUrlFn(id)
        .then(result => {
          console.log(result.data);
          this.songUrl = result.data.data[0].url;
          console.log(result.data.data[0].url);
        })
        .catch(err => {});
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE"
    })
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
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
    animation palying 8s infinite linear
    img
      height 200px
      width 200px
      border-radius 50%
  @keyframes palying
    0%
      -webkit-transform rotate(0deg)
      transform rotate(0deg)
    100%
      -webkit-transform rotate(360deg)
      transform rotate(360deg)
  .vinyl-stop
    position relative
    bottom 60px
    height 300px
    width 300px
    background url('../../assets/img/vinyl.png')
    background-size 300px 300px
    display flex
    align-items center
    justify-content center
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
</style>