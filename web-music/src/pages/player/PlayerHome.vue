<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <div class="vinyl-content">
      <div class="stylus">
        <img src="../../assets/img/stylus.png" alt />
      </div>
      <div class="vinyl"></div>
    </div>
    <div class="btn-wapper">
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
    </div>
    <div class="palyer-progress"></div>
    <div class="palyer">
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
      <i class="iconfont icon-pengyou"></i>
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
      btnShow: false
    };
  },
  methods: {
    leftClickBtn() {
      this.$router.back(-1);
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
    z-index 1000
    img
      margin-left 70px
      height 140px
      width 100px
  .vinyl
    position relative
    bottom 60px
    height 300px
    width 300px
    background url('../../assets/img/vinyl.png')
    background-size 300px 300px
.btn-wapper
  display flex
  justify-content space-around
  align-items center
  i
    font-size 30px
    color $color-theme
.palyer-progress
  margin-top 20px
  height 40px
  background-color pink
.palyer
  display flex
  justify-content space-around
  align-items center
  i
    margin-top 16px
    font-size 30px
    color $color-theme
  :nth-child(3)
    font-size 40px
</style>