<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <div class="header-wapper">
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
          @load="getBgColor"
          crossorigin="anonymous"
        />
        <div class="info">
          <span>{{playlist.name}}</span>
          <div class="author" v-if="playlist.creator!==undefined">
            <img v-lazy="playlist.creator.avatarUrl" class="author-img" :onerror="defaultImg" />
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
    <!-- 歌曲列表组件 -->
    <song-list
      :playlist="playlist"
      :tracks="tracks"
      :type="type"
      :subscribers="subscribers"
      @moreBtn="moreBtn(arguments)"
      @playingMusic="playingMusic(arguments)"
    ></song-list>
    <!-- 底部弹出窗 -->
    <van-action-sheet v-model="sheetShow" title="标题">
      <div class="sheet">
        <div class="sheet-up"></div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>歌手：</span>
          <div class="artists">
            <span v-for="singer in sheetItem.ar">{{singer.name}}</span>
          </div>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>专辑：</span>
          <span>{{sheetItem.al.name}}</span>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>分享</span>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>评论</span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SongList from "@/components/SongList";

import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar,
    SongList
  },
  data() {
    return {
      milddleTip: "歌单",
      id: "",
      playlist: {},
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"',
      color: [], //提取背景色
      tracks: [],
      subscribers: [],
      sheetShow: false,
      sheetItem: {
        al: {}
      },
      type: 1
    };
  },
  mounted() {
    this.id = this.$route.query.id; //歌单id
    console.log(this.id);
    this.playlistDetailFn(this.id);
  },
  methods: {
    getAlbumFn(id) {
      api
        .getAlbumFn(id)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    leftClickBtn() {
      this.$router.back(-1);
    },
    moreBtn(msg) {
      const item = msg[0];
      const index = msg[1];
      this.sheetItem = item;
      console.log(item);
      this.sheetShow = true;
    },
    playingMusic(msg) {
      console.log(msg);
      const item = msg[0];
      const index = msg[1];
      this.getSongUrlFn(item.id);
      this.setPlaylist(this.tracks);
      this.setSequenceList(this.tracks);
      this.setCurrentIndex(index);
      this.setPlayingState(true);
      this.setFullScreen(true);
    },
    getSongUrlFn(id) {
      api
        .getSongUrlFn(id)
        .then(result => {
          console.log(result.data);
          this.setSongUrl(result.data.data[0].url);
        })
        .catch(err => {});
    },
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
          this.tracks = result.data.playlist.tracks;
          this.subscribers = result.data.playlist.subscribers;
        })
        .catch(err => {});
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setSongUrl: "SET_SONG_URL",
      setSequenceList: "SET_SEQUENCE_LIST"
    })
  },
  computed: {
    ...mapGetters([])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  height 100%
  padding-bottom 60px
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
.sheet
  padding 0 10px
  margin-bottom 20px
  .sheet-up
    height 80px
    background pink
  .sheet-item
    padding 4px
    display flex
    justify-content flex-start
    align-items center
    height 40px
    :nth-child(2)
      padding-left 8px
    .artists
      display felx
      justify-content flex-start
      span
        padding-right 2px
      ::after
        content '/'
      :last-child::after
        content ''
</style>