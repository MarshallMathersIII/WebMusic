<template>
  <div class="content">
    <!-- 搜索 -->
    <div class="search">
      <i @click="showPopup" class="iconfont icon-gongnengtubiao-86"></i>
      <div class="serach-wapper">
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" @focus="focus"/>
      </div>
      <i class="iconfont icon-huatong1"></i>
    </div>
    <!-- 轮播图  bannerClick-->
    <banner-swiper :bannerList="bannerList" @bannerClick="bannerClick"></banner-swiper>
    <!-- Icon图标 -->
    <icon-list :icons="findIcons"></icon-list>
    <!-- 推荐歌单 -->
    <roll-list :list="playList" :title="title" :type="rollType" @rollListClick="rollListClick"></roll-list>
    <!-- 分割线 -->
    <div v-if="playList.length>0" class="divider"></div>
    <!-- TODO新歌/新碟/数字专辑 切换tab 样式改变 -->
    <div class="new-title">
      <div class="new-left">
        <div @click="tabChange(1)" :class="[isTabActive=='1'?'tabActive':'']">新歌</div>|
        <div @click="tabChange(2)" :class="[isTabActive=='2'?'tabActive':'']">新碟</div>|
        <div @click="tabChange(3)" :class="[isTabActive=='3'?'tabActive':'']">数字专辑</div>
      </div>
      <div class="new-more">更多</div>
    </div>
    <!-- 新歌/新碟/数字专辑列表 -->
    <!-- TODO 接口返回图片过大newSonglist -->
    <div class="new-list" v-for="item in newSonglist">
      <img class="new-img" v-lazy="item.blurPicUrl" />
      <div class="new-info">
        <div class="info-up">
          <span>{{item.name}}</span>
          <span>{{item.artist.name}}</span>
        </div>
        <div class="info-down">
          <span>{{item.type}}</span>
          <span>{{item.company}}</span>
        </div>
      </div>
    </div>
    <slider v-model="popShow"></slider>
  </div>
</template>
<script>
import IconList from "../../components/IconList";
import api from "../../api/api.js";
import BannerSwiper from "@/components/BannerSwiper";
import RollList from "@/components/RollList";
import Slider from "./component/Slider";
import { findIcons, popupIcons } from "../../assets/iconsdata/getIcons.js";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    RollList,
    IconList,
    BannerSwiper,
    Slider
  },
  data() {
    return {
      title: {
        leftText: "推荐歌单",
        rightText: "更多"
      },
      rollType: "2",
      isTabActive: "1",
      show: false,
      popShow: false,
      milddleTip: "发现页面",
      value: "",
      bannerList: [],
      findIcons: [],
      popupIcons: [],
      playList: [],
      newSonglist: [], //临时歌单
      topSongList: [], //新歌
      albumList: [], //数字专辑
      topDishList: [], //新碟
      tracks: []
    };
  },
  mounted() {
    // this.homepageFn();
    this.iniData();
    this.bannerSwiperFn();
    this.playListFn();
    // this.newDishFn();
    // this.newAlbumFn();
    // this.topSongFn();
  },
  activated() {
    this.popShow = false;
  },
  methods: {
    focus(event){
      console.log(event)
       this.$router.push({
        path: "/SearchHome"
      });
    },


    //TODO 歌曲封面切换，深、浅拷贝问题
    bannerClick(val) {
      console.log(val);
      this.tracks.push(val);
      this.playingMusic(val,0);
    },
    playingMusic(val, index) {
      this.getSongUrlFn(val.id);
      this.setPlaylist(this.tracks.slice());
      this.setSequenceList(this.tracks.slice());
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
    rollListClick(val) {
      console.log(val);
      this.toListDetail(val);
    },
    toListDetail(id) {
      this.$router.push({
        path: "/ListHome",
        query: { id: id }
      });
    },
    homepageFn() {
      api
        .homepageFn()
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    showPopup() {
      this.popShow = true;
    },
    async iniData() {
      this.findIcons = findIcons();
      this.popupIcons = popupIcons();
    },
    bannerSwiperFn() {
      api
        .bannerSwiperFn()
        .then(result => {
          console.log(result.data);
          this.bannerList = result.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    },
    playListFn() {
      api
        .playListFn()
        .then(result => {
          console.log(result.data.playlists);
          this.playList = result.data.playlists.slice(0, 6); //返回50条数据截取数组前6
        })
        .catch(err => {
          console.log(err);
        });
    },
    async newDishFn() {
      api
        .newDishFn()
        .then(result => {
          this.topDishList = result.data.albums.slice(0, 3);
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    topSongFn() {
      api
        .topSongFn()
        .then(result => {
          console.log(result.data.data);
          this.newSonglist = result.data.data.slice(0, 3);
          console.log(result.data.data.slice(0, 3));
        })
        .catch(err => {
          console.log(err);
        });
    },
    async newAlbumFn() {
      console.log("newAlbumFn");
      api
        .newAlbumFn()
        .then(result => {
          this.albumList = result.data.albums.slice(0, 3);
          this.newSonglist = this.albumList; //初始化加载
        })
        .catch(err => {
          console.log(err);
        });
    },
    //TODO 常量引入
    tabChange(type) {
      switch (type) {
        case 1:
          this.isTabActive = "1";
          this.newSonglist = this.topDishList;
          break;
        case 2:
          this.isTabActive = "2";
          this.newSonglist = this.albumList;
          break;
        case 3:
          this.isTabActive = "3";
          this.newSonglist = this.topDishList;
          break;
        default:
          break;
      }
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
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "songUrl"
    ])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  // 底部Tab遮挡解决
  padding-bottom 60px
  .search
    margin-top 10px
    display flex
    justify-content center
    align-items center
    padding 0 10px
    .serach-wapper
      width 90%
    .iconfont
      font-size 20px
  .divider
    divider()
  .new-title
    display flex
    justify-content center
    align-items center
    justify-content space-between
    margin 10px 10px 10px 5px
    title()
    .new-left
      display flex
      div
        color grey
        padding 0 5px
      .tabActive
        color black
  .new-list
    display flex
    align-items center
    justify-content flex-start
    margin 10px
    .new-img
      border-radius 10px
      height 60px
      width 60px
      background-color #F7F8FA
    .new-info
      margin 10px
      flex 1
      .info-up
        font-size 12px
      .info-down
        margin-top 4px
        font-size 8px
        color grey
</style>