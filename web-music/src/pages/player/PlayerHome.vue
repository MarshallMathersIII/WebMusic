<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <!-- 唱盘主义 -->
    <div class="vinyl-content">
      <div class="stylus">
        <div class="spot"></div>
        <img src="../../assets/img/stylus.png" :class="[isPlaying?playClass:stopClass]" />
      </div>
      <div :class="[isPlaying?vinyl:vinylStop]">
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

export default {
  components: {
    TitleBar
  },

  data() {
    return {
      milddleTip: "播放组件",
      phone: "",
      btnShow: false,
      isPlaying: false,
      playClass: "play",
      stopClass: "stop",
      vinyl: "vinyl",
      vinylStop: "vinyl-stop",
      tracksItem: {},
      songUrl: "",
      picUrl: ""
    };
  },
  mounted() {
    this.tracksItem = this.$route.query.tracksItem; //歌曲
    this.picUrl = this.$route.query.tracksItem.al.picUrl; //唱片封面
    console.log(this.tracksItem);
    this.getSongUrlFn(this.tracksItem.id);
  },
  computed: {
    playIcon() {
      return this.isPlaying ? "iconfont icon-zanting" : "iconfont icon-bofang";
    }
  },
  methods: {
    playMode() {},
    nextPlay() {},
    prePlay() {},
    changePlaying() {
      this.$refs.audio.src = this.songUrl;
      this.isPlaying = this.isPlaying ? false : true;
      this.isPlaying ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    leftClickBtn() {
      this.$router.back(-1);
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
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  background-color #ffffff
  position absolute
  z-index 1000
  width 100%
  height 100%
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