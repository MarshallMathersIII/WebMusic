<template>
  <div class="content">
    <div class="title"></div>
    <div class="user">
      <div class="user-img"></div>
      <div>立即登录</div>
      <i class="iconfont icon-huatong"></i>
    </div>
    <div class="user-app">
      <div class="item" v-for="item in list">
        <i class="iconfont icon-huatong"></i>
        <span>本地下载</span>
      </div>
    </div>
    <div class="favorite-music">
      <div class="icon">
        <i class="iconfont icon-huatong"></i>
      </div>
      <div class="tip">
        <span>我喜欢的音乐</span>
        <span>0首</span>
      </div>
    </div>
    <div class="song-list">
      <van-tabs v-model="active">
        <van-tab title="创建歌单"></van-tab>
        <van-tab title="收藏歌单"></van-tab>
      </van-tabs>
    </div>
    <div class="setup-list">
      <div class="list-title">
        <span>创建歌单</span>
        <div class="icon">
          <i class="iconfont icon-huatong"></i>
          <i class="iconfont icon-huatong"></i>
        </div>
      </div>
      <div class="list-content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ["1", "2", "3", "3", "1", "2", "3", "3"],
      active: 2
    };
  }
};
</script>

<style scoped  lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  background-color #e9e9e9
  height 1200px
  .title
    height 60px
    background-color pink
  .user
    display flex
    align-items center
    justify-content flex-start
    margin 10px
    .user-img
      height 60px
      width 60px
      border-radius 50%
      background-color pink
    :nth-child(2)
      margin-left 10px
  .user-app
    border-radius 10px
    background-color pink
    margin 10px
    display flex
    justify-content flex-start
    flex-wrap wrap
    align-items center
    .item
      flex 0 0 19.8%
      padding 10px
      width 50px
      height 50px
      display flex
      justify-content center
      align-items center
      flex-direction column
      :first-child
        font-size 30px
  .favorite-music
    height 80px
    margin 10px
    background-color pink
    border-radius 10px
    display flex
    justify-content flex-start
    align-items center
    .icon
      line-height 50px
      text-align center
      margin-left 20px
      height 50px
      width 50px
      border-radius 10px
      background-color #e9e9e9
    .tip
      margin-left 10px
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      span
        padding 2px
  .song-list>>> .van-tabs__line
    background-color pink
  .song-list>>> .van-ellipsis
    background-color #e9e9e9
  .song-list>>> .van-tab
      background-color #e9e9e9
  .setup-list
    margin 10px
    border-radius 10px
    background-color pink
    .list-title
      padding 10px
      display flex
      justify-content space-between
      align-items center
      margin 10px
    .list-content
      height 100px
</style>