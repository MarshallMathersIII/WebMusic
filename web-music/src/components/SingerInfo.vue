<template>
  <div class="content">
    <!-- TODO 背景图拉伸 -->
    <div
      class="bg-img"
      :style="{ 'background': 'url(' + bgUrl + ') no-repeat center center', 'background-size': 'cover'}"
    ></div>
    <div class="bg-down"></div>
    <div class="singer">
      <span>{{name}}</span>
      <span>{{fans}} 粉丝</span>
    </div>
    <div class="user-img" v-if="type===1">
      <img :src="avatarUrl" alt />
    </div>
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
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: "RadioHead"
    },
    bgUrl: {
      type: String,
      default: ""
    },
    avatarUrl: {
      type: String,
      default: ""
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
    bottom 80px
    margin 0 auto
    img
      border-radius 50%
      height 60px
      width 60px
</style>