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
    <!-- 歌单列表 -->
    <div class="song-list">
      <!-- 列表头部 -->
      <div class="list-title">
        <div class="left">
          <i class="iconfont icon-bofang-01"></i>
          <span>播放全部({{playlist.trackCount}})</span>
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
          <span >{{sheetItem.al.name}}</span>
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
import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
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
      color: [], //提取背景色
      tracks: [],
      subscribers: [],
      sheetShow: false,
      sheetItem: {
        al: {}
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id; //歌单id
    console.log(this.id);
    this.playlistDetailFn(this.id);
  },
  methods: {
    getAlbumFn(id){
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
    moreBtn(item, index) {
      this.sheetItem = item;
      console.log(item);
      this.sheetShow = true;
    },
    playingMusic(item, index) {
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