<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <div>
      <div class="header">
        <!--@load需加载完成执行提取色方法 crossorigin="anonymous"解决网络图片跨域问题 -->
        <img
          ref="bgImg"
          class="img"
          v-lazy="playlist.coverImgUrl"
          :onerror="defaultImg"
          @load="getBgColor"
          crossorigin="anonymous"
        />
        <div class="info">
          <span>{{playlist.name}}</span>
          <div class="author" v-if="playlist.creator!==undefined">
            <img v-lazy="playlist.creator.avatarUrl" class="author-img" />
            <div class="author-tip">{{playlist.creator.nickname}}</div>
          </div>
          <span>{{playlist.description}}</span>
        </div>
      </div>
      <div class="btn-wapper"></div>
      <div class="btn">
        <div>
          <i class="iconfont icon-diantai"></i>
          <i>{{playlist.subscribedCount}}</i>
        </div>
        <div>
          <i class="iconfont icon-diantai"></i>
          <i>{{playlist.commentCount}}</i>
        </div>
        <div>
          <i class="iconfont icon-fenxiang"></i>
          <i>{{playlist.shareCount}}</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import api from "api/api.js";
import ColorThief from "color-thief";
export default {
  components: {
    TitleBar
  },
  data() {
    return {
      milddleTip: "歌单",
      id: "",
      playlist: [],
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"',
      color: [] //提取背景色
    };
  },
  mounted() {
    this.id = this.$route.query.id; //歌单id
    console.log(this.id);
    this.playlistDetailFn(this.id);
  },
  methods: {
    getBgColor() {
      console.log("palette");
      var colorThief = new ColorThief();
      this.color = colorThief.getColor(this.$refs.bgImg);
      console.log(colorThief.getPalette(this.$refs.bgImg, 8));
      console.log(colorThief.getColor(this.$refs.bgImg));
    },
    playlistDetailFn(id) {
      api
        .playlistDetailFn(id)
        .then(result => {
          console.log(result.data.playlist);
          this.playlist = result.data.playlist;
        })
        .catch(err => {});
    }
  },
  computed: {

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
  background-color pink
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
    .author
      display flex
      justify-content flex-start
      align-items center
      .author-img
        border-radius 50%
        height 25px
        width 25px
        background grey 
.btn-wapper
  z-index 900
  position relative
  bottom 30px
  background-color white
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
  margin 0 auto
  bottom 100px
  border-radius 25px
  display flex
  justify-content space-around
  align-items center
  box-shadow inset 0 0 2px #CCC
</style>