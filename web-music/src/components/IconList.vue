<template>
  <div class="icons">
    <div class="icon-wrapper">
      <div class="icon-item" v-for="item in icons">
        <i :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IconList",
  props: {
    icons: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped lang="stylus">
.icons
  // 外层容器高度低于子元素，hidden隐藏进度条
  overflow hidden
  height 70px
  .icon-wrapper
    height 80px
    display flex
    align-items center
    justify-content space-between
    overflow-x auto
    overflow-y hidden
    // 解决ios手机页面滑动卡顿问题
    overflow-scrolling touch
    .icon-item
      padding 10px
      white-space nowrap
      display flex
      flex-direction column
      justify-content center
      align-items center
      .iconfont
        font-size 38px
      span
        font-size 6px
</style>