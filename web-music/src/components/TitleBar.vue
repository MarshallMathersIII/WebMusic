<template>
  <div class="title">
    <div class="left" :style="changeStyle(leftShow)">
      <i class="iconfont icon-fanhui1" :style="changeStyle(leftIconShow)"></i>
      <span :style="changeStyle(leftTipShow)">返回</span>
    </div>
    <div class="middle">{{milddleTip}}</div>
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
    milddleTip:{
      type: String,
      default: ""
    },
    rightShow:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    //动态切换显示隐藏函数，保持占位不改变布局
    changeStyle(show) {
      return { visibility: show ? "initial" : "hidden" };
    }
  }
};
</script>

<style scoped lang="stylus">
.title
  background-color #fff
  height 60px
  justify-content space-between
  align-items center
  display flex
  div
    flex 1
    display flex
    justify-content center
    align-items center
  .middle
    flex 3
.test
  height 20px
</style>