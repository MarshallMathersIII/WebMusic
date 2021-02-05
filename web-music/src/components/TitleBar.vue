<template>
  <div class="title">
    <div class="left" :style="changeStyle(leftShow)" @click="leftClick">
      <i :class="leftIcon" :style="changeStyle(leftIconShow)"></i>
      <span :style="changeStyle(leftTipShow)">返回</span>
    </div>
    <div class="middle">
      <slot></slot>
      {{milddleTip}}
    </div>
    <div class="right" :style="changeStyle(rightShow)">
      <span>返回</span>
      <i class="iconfont icon-faxian"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "TitleBar",
  props: {
    leftShow: {
      type: Boolean,
      default: true
    },
    leftIconShow: {
      type: Boolean,
      default: true
    },
    leftTipShow: {
      type: Boolean,
      default: false
    },
    leftIcon: {
      type: String,
      default: "iconfont icon-fanhui1"
    },
    milddleTip: {
      type: String,
      default: ""
    },
    rightShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //动态切换显示隐藏函数，保持占位不改变布局
    changeStyle(show) {
      return { visibility: show ? "initial" : "hidden" };
    },
    leftClick() {
      this.$emit("leftBtn");
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.title
  padding 0 10px
  height 60px
  justify-content space-between
  align-items center
  display flex
  color black
  font-size $font-size-large
  .iconfont
    font-size $font-size-large
  div
    display flex
    justify-content center
    align-items center
  .middle
    flex 1
    display flex
    justify-content center
    align-items center
</style>