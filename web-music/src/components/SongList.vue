<template>
  <div class="content">
    <!-- 歌单列表 -->
    <div class="song-list">
      <!-- 列表头部 -->
      <div class="list-title">
        <div class="left">
          <i class="iconfont icon-bofang-01"></i>
          <span >播放全部 ({{tracks.length}})</span>
        </div>
        <div class="right">
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-xuanze"></i>
        </div>
      </div>
      <!-- 列表内容 -->
      <div class="list-content" v-for="(item,index) in tracks" :key="item.id">
        <div class="left" @click="playingMusic(item,index)">
          <span>{{index+1}}</span>
          <div class="song-info">
            <span>{{item.name}}</span>
            <div class="artists">
              <span v-for="singer in item.ar">{{singer.name}}</span>
            </div>
          </div>
        </div>
        <div class="right" @click="moreBtn(item,index)">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </div>
      <!-- 列表底部 -->
      <div v-if="type===1">
        <div class="list-bottom" v-if="playlist.subscribedCount!==0">
          <div class="left">
            <img v-lazy="item.avatarUrl" class="bottom-img" v-for="item in subscribers.slice(0,5)" />
          </div>
          <div class="right">
            <span>{{playlist.subscribedCount}}人收藏</span>
            <i class="iconfont icon-jiantou"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SongList",
  props: {
    subscribers: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tracks: {
      type: Array,
      default: function() {
        return [];
      }
    },
    playlist: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 0：歌手详情歌曲列表；1:歌单歌曲列表
    type: {
      type: Number,
      default: 0
    }
  },
  methods: {
    playingMusic(item, index) {
      this.$emit("playingMusic", item, index);
    },
    moreBtn(item, index) {
      this.$emit("moreBtn", item, index);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.content
  .song-list
    padding 0 10px
    .list-title
      height 60px
      width 100%
      align-items center
      justify-content space-between
      display flex
      .left
        font-size $font-size-medium-x
        i
          color red
          font-size 18px
    .list-content
      height 50px
      display flex
      align-items center
      justify-content space-between
      .left
        height 38px
        display flex
        align-items center
        justify-content flex-start
        flex 1
        no-wrap()
        span
          color red
          width 24px
          height 14px
          line-height 14px
          text-align center
        .song-info
          margin-left 10px
          margin-right 6px
          display flex
          flex 1
          no-wrap()
          justify-content center
          align-items flex-start
          flex-direction column
          :first-child
            color black
            font-size $font-size-small
          .artists
            display felx
            justify-content flex-start
            span
              padding-right 2px
              color grey
            ::after
              content '/'
            :last-child::after
              content ''
      .right
        extend-click()
    .list-bottom
      margin-top 6px
      height 30px
      width 100%
      display flex
      justify-content space-between
      align-items center
      .left
        display flex
        .bottom-img
          border-radius 10px
          margin-left 5px
          width 20px
          height 20px
</style>