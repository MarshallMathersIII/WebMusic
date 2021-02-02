<template>
  <div class="content">
    <div
      class="bg-img"
      :style="{ 'background': 'url(' + bgUrl + ') no-repeat center center', 'background-size': 'cover'}"
    ></div>
    <div class="bg-down"></div>
    <div class="singer">
      <span>{{name}}</span>
      <span>{{fans}} 粉丝</span>
    </div>
    <div class="user-img" v-if="type===1"></div>
  </div>
</template>
<script>
export default {
  name: "SingerInfo",
  props: {
    type: {
      type: Number,
      default: 0
    },
    fans: {
      type: String,
      default: "22224"
    },
    name: {
      type: String,
      default: "RadioHead"
    },
    bgUrl: {
      type: String,
      default:
        "http://p1.music.126.net/VRRQf1OR0_I-tGpi2_B6lQ==/109951164656872272.jpg"
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.content
  .bg-img
    position absolute
    top 0
    left 0
    width 100%
    height 240px
    z-index -1
    border-bottom-right-radius 4px
    border-bottom-left-radius 4px
  .bg-down
    height 100px
    background-color $color-background-grey
    position relative
    top 180px
  .singer
    top 55px
    height 100px
    border-radius 10px
    background white
    margin 0 20px
    position relative
    display flex
    flex-direction column
    justify-content center
    align-items center
    :first-child
      font-size 18px
      font-weight bold
      color black
      margin-bottom 10px
    :nth-child(2)
      tips()
  .user-img
    position relative
    border-radius 50%
    height 60px
    width 60px
    background-color pink
    bottom 80px
    margin 0 auto
</style>