<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <div class="header">
      <div class="img"></div>
      <div class="info">
        <span>反正按钮在你手上5456经DSL卡的健康卡上的接口撒娇的</span>
        <div class="author">
          <div class="author-img"></div>
          <div class="author-tip">27836173</div>
        </div>
        <span>哦啊就是嗲十四大</span>
      </div>
    </div>
    <div class="btn-wapper"></div>
    <div class="btn">
        <div>
            <i>923</i>
            <i>321</i>
        </div>
         <div>
            <i>923</i>
            <i>321</i>
        </div>
         <div>
            <i>923</i>
            <i>321</i>
        </div>
    </div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      milddleTip: "歌单"
    };
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.header
  position relative
  padding 10px
  display flex
  justify-content flex-start
  align-items center
  height 160px
  background pink
  z-index 1000
  .img
    height 100px
    width 100px
    background blue
    border-radius 10px
  .info
    flex 1
    height 100px
    display flex
    justify-content space-around
    flex-direction column
    align-items flex-start
    margin-left 10px
    background-color green
    .author
      display flex
      justify-content flex-start
      align-items center
      .author-img
        height 20px
        width 20px
        background #000
.btn-wapper
  z-index 900
  position relative
  bottom 30px
  background-color blue
  height 80px
  display flex
  justify-content center
  align-items center
.btn
  position relative
  z-index 1900
  background-color white
  height 50px
  width 280px
  margin:0 auto;
  bottom 100px
  border-radius 25px
  display flex
  justify-content space-around
  align-items center

</style>