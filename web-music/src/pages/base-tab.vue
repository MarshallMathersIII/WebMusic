<template>
  <div class="tab" v-show="true">
    <!--router-link 需要加tag=‘div’ -->
    <router-link tag="div" class="tab-item" to="FindHome">
      <div>
        <i class="iconfont icon-faxian"></i>
        <p>发现</p>
      </div>
    </router-link>
    <router-link tag="div" class="tab-item" to="RadioHome">
      <i class="iconfont icon-diantai"></i>
      <p>电台</p>
    </router-link>
    <router-link tag="div" class="tab-item" to="MineHome">
      <i class="iconfont icon-yinle"></i>
      <p>我的</p>
    </router-link>
    <!-- <router-link tag="div" class="tab-item" to="KtvHome">
      <i class="iconfont icon-huatong"></i>
      <p>k歌</p>
    </router-link> -->
    <router-link tag="div" class="tab-item" to="ListHome">
      <i class="iconfont icon-pengyou"></i>
      <p>视频</p>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSclect: true
    };
  }
};
</script>
<style scoped lang="stylus" >
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.tab
  background-color #fff
  z-index 1000
  display flex
  position fixed
  bottom 0
  justify-content center
  align-items center
  height 60px
  width 100%
  border-top 1px solid rgba(0, 0, 0, 0.2)
  .tab-item
    flex-direction column
    height 100%
    display flex
    flex 1
    background-color #ffffff
    align-items center
    justify-content center
    // router-link切换标签改变样式/iconfont图标大小控制使用font-size
    .iconfont
      font-size 30px
    p
      text-align center
      font-size $font-size-small
    &.router-link-active
      .iconfont
        font-size 30px
        color $color-theme
      p
        text-align center
        font-size $font-size-small
        color $color-theme
</style>