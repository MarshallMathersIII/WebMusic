<template>
  <!-- 歌单/专辑头部展示组件 -->
  <div class="content">
    <div class="header-wapper" v-if="type===0">
      <!-- 背景图实现高斯模糊 -->
      <div class="background" :style="{backgroundImage: 'url(' + playlist.coverImgUrl + ')' }">
        <!-- <img :src="currentSong.al.picUrl" /> -->
      </div>
      <div class="header">
        <!--@load需加载完成执行提取色方法 crossorigin="anonymous"解决网络图片跨域问题 -->
        <!-- 歌单头部 -->
        <img
          ref="bgImg"
          class="img"
          v-lazy="playlist.coverImgUrl"
          :onerror="defaultImg"
          crossorigin="anonymous"
          @load="getBgColor"
        />
        <div class="info">
          <span>{{playlist.name}}</span>
          <div class="author" v-if="playlist.creator!==undefined">
            <img v-lazy="playlist.creator.avatarUrl" class="author-img" />
            <div class="author-tip">{{playlist.creator.nickname}}</div>
          </div>
          <span class="author-des">{{playlist.description}}</span>
        </div>
      </div>
      <!-- 头部 收藏/评论分享 -->
      <div class="btn-wapper"></div>
      <div class="btn">
        <div>
          <i class="iconfont icon-xuanze"></i>
          <i>{{playlist.subscribedCount}}</i>
        </div>
        <!-- 分割线 -->
        <div style="float:left;width: 1px;height: 16px; background: grey;"></div>
        <div>
          <i class="iconfont icon-pinglun"></i>
          <i>{{playlist.commentCount}}</i>
        </div>
        <div style="float:left;width: 1px;height: 16px; background: grey;"></div>
        <div>
          <i class="iconfont icon-fenxiang"></i>
          <i>{{playlist.shareCount}}</i>
        </div>
      </div>
    </div>
     <div class="header-wapper" v-else>
      <!-- 背景图实现高斯模糊 -->
      <div class="background" :style="{backgroundImage: 'url(' + playlist.blurPicUrl + ')' }">
        <!-- <img :src="currentSong.al.picUrl" /> -->
      </div>
      <div class="header">
        <!--@load需加载完成执行提取色方法 crossorigin="anonymous"解决网络图片跨域问题 -->
        <!-- 歌单头部 -->
        <img
          ref="bgImg"
          class="img"
          v-lazy="playlist.blurPicUrl"
          :onerror="defaultImg"
          crossorigin="anonymous"
          @load="getBgColor"
        />
        <div class="info">
          <span>{{playlist.name}}</span>
          <div class="author" v-if="playlist.artists!=null">
            <div class="author-tip">歌手:{{playlist.artists[0].name}}</div>
          </div>
          <span class="author-des">{{playlist.description}}</span>
        </div>
      </div>
      <!-- 头部 收藏/评论分享 -->
      <div class="btn-wapper"></div>
      <!-- 判空数据请求完显示 -->
      <div class="btn" v-if="playlist.info!=null">
        <div>
          <i class="iconfont icon-xuanze"></i>
          <i>{{playlist.info.likedCount}}</i>
        </div>
        <!-- 分割线 -->
        <div style="float:left;width: 1px;height: 16px; background: grey;"></div>
        <div>
          <i class="iconfont icon-pinglun"></i>
          <i>{{playlist.info.commentCount}}</i>
        </div>
        <div style="float:left;width: 1px;height: 16px; background: grey;"></div>
        <div>
          <i class="iconfont icon-fenxiang"></i>
          <i>{{playlist.info.shareCount}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorThief from "color-thief";

export default {
  name: "AlbumBanner",
  data() {
    return {
      milddleTip: "歌单",
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"',
      color: [] //提取背景色
    };
  },
  props: {
    playlist: {
      type: Object,
      default: function() {
        return {
            info:{}
        };
      }
    },
    type: {
      type: Number,
      default: 0 //0:歌单页面 1专辑页
    }
  },
  methods: {
    toListDetail(id) {
      this.$emit("toListDetail", id);
    },
    getBgColor() {
      console.log("palette");
      var colorThief = new ColorThief();
      this.color = colorThief.getColor(this.$refs.bgImg);
      console.log(colorThief.getPalette(this.$refs.bgImg, 8));
      console.log(colorThief.getColor(this.$refs.bgImg));
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.header-wapper
  height 220px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 30%
    z-index -1
    opacity 0.8
    filter blur(10px)
    transform scale(1.2) // 去除模糊背景白边
  .header
    position relative
    padding 10px
    display flex
    justify-content flex-start
    align-items center
    height 160px
    z-index 1000
    .img
      height 100px
      width 100px
      border-radius 10px
    .info
      color white
      flex 1
      height 100px
      display flex
      justify-content space-around
      flex-direction column
      align-items flex-start
      margin-left 10px
      margin-right 10px
      no-wrap()
      .author
        display flex
        justify-content flex-start
        align-items center
        .author-img
          border-radius 50%
          height 25px
          width 25px
          margin-right 6px
      .author-des
        font-size $font-size-small-s
  .btn-wapper
    z-index 900
    position relative
    bottom 10px
    height 70px
    display flex
    background-color #fff
    justify-content center
    align-items center
  .btn
    position relative
    z-index 1900
    background-color white
    height 50px
    width 280px
    margin 0 auto
    bottom 100px
    border-radius 25px
    display flex
    justify-content space-around
    align-items center
    box-shadow inset 0 0 2px #CCC
</style>