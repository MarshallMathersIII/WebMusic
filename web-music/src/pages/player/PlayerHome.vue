<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <div class="vinyl-content">
      <div class="stylus">
        <div class="spot"></div>
        <img src="../../assets/img/stylus.png" :class="[isPlaying?playClass:stopClass]" />
      </div>
      <div :class="[isPlaying?vinyl:vinylStop]">gil scott-heron</div>
    </div>
    <div class="btn-wapper">
      <i class="iconfont icon-xihuan1"></i>
      <i class="iconfont icon-xiazai1"></i>
      <i class="iconfont icon-pinglun1"></i>
      <i class="iconfont icon-gengduo1"></i>
    </div>
    <div class="palyer-progress"></div>
    <div class="palyer">
      <i class="iconfont icon-suijibofang"></i>
      <i class="iconfont icon-shangyishouxianxing"></i>
      <i class="iconfont icon-bofang" @click="play"></i>
      <i class="iconfont icon-xiayishouxianxing"></i>
      <i class="iconfont icon-juxing"></i>
    </div>
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
      isPlaying: true,
      playClass: "play",
      stopClass: "stop",
      vinyl: "vinyl",
      vinylStop: "vinyl-stop"
    };
  },
  methods: {
    leftClickBtn() {
      this.$router.back(-1);
    },
    play() {
      this.isPlaying = this.isPlaying ? false : true;
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
    animation palying 4s infinite linear
    animation-fill-mode forwards
    -webkit-animation-iteration-count 1
    -webkit-animation-fill-mode forwards
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