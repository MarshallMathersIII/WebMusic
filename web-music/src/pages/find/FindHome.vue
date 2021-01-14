<template>
  <div class="content">
    <!-- 搜索 -->
    <div class="search">
      <i @click="showPopup" class="iconfont icon-fanhui"></i>
      <div class="serach-wapper">
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
      </div>
      <i class="iconfont icon-huatong1"></i>
    </div>
    <!-- 轮播图 -->
    <banner-swiper :bannerList="bannerList"></banner-swiper>
    <!-- Icon图标 -->
    <icon-list :icons="findIcons"></icon-list>
    <!-- 推荐歌单 -->
    <div class="song-title">
      <div>推荐歌单</div>
      <div class="more">更多</div>
    </div>
    <div class="song-list">
      <div class="song-item" v-for="item in playList">
        <img v-lazy="item.coverImgUrl" alt class="song-img" />
        <span>{{item.name}}</span>
      </div>
    </div>
    <!-- 分割线 -->
    <div v-if="playList.length>0" class="divider"></div>
    <!-- TODO新歌/新碟/数字专辑 切换tab 样式改变 -->
    <div class="new-title">
      <div class="new-left">
        <div @click="tabChange(1)">新歌</div>|
        <div @click="tabChange(2)">新碟</div>|
        <div @click="tabChange(3)">数字专辑</div>
      </div>
      <div class="new-more">更多</div>
    </div>
    <!-- 新歌/新碟/数字专辑列表 -->
    <div class="new-list" v-for="item in newSonglist">
      <img class="new-img" v-lazy="item.picUrl" />
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
    <!-- TODO:popu滑动穿透 -->
    <van-popup
      bind:after-enter
      :zIndex="20000"
      v-model="popShow"
      position="left"
      :style="{ height: '100%',width:'80%'}"
    ></van-popup>
  </div>
</template>
<script>
import IconList from "../../components/IconList";
import api from "../../api/api.js";
import BannerSwiper from "./component/BannerSwiper";
import { findIcons } from "../../assets/iconsdata/getIcons.js";

export default {
  components: {
    IconList,
    BannerSwiper
  },
  data() {
    return {
      show: false,
      popShow: false,
      milddleTip: "发现页面",
      value: "",
      bannerList: [],
      findIcons: [],
      playList: [],
      type: 1,
      newSonglist: [],
      topSongList: [], //新歌
      albumList: [], //数字专辑
      topDishList: [] //新碟
    };
  },
  mounted() {
    this.iniData();
    this.bannerSwiperFn();
    this.playListFn();
    this.newDishFn();
    this.newSongsFn();
    this.newAlbumFn();
  },
  methods: {
    showPopup() {
      this.popShow = true;
    },
    async iniData() {
      console.log(findIcons());
      this.findIcons = findIcons();
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
    newDishFn() {
      api
        .newDishFn()
        .then(result => {
          this.topDishList = result.data.albums.slice(0, 4);
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    newSongsFn() {
      console.log("newSongsFn");
      api
        .newSongsFn()
        .then(result => {
          console.log(result.data);
          // this.topSongList = result.data.slice(0, 3);
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
          this.albumList = result.data.albums.slice(0, 4);
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
          type = 1;
          this.newSonglist = this.topDishList;
          break;
        case 2:
          type = 2;
          this.newSonglist = this.albumList;
          break;
        case 3:
          type = 3;
          this.newSonglist = this.topDishList;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
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
  .song-title
    display flex
    justify-content space-between
    align-items center
    margin 14px 10px 0 10px
  .song-list
    display flex
    justify-content center
    align-items center
    justify-content space-between
    overflow-x auto
    overflow-y hidden
    .song-item
      height 120px
      padding 10px
      white-space nowrap
      display flex
      flex-direction column
      justify-content center
      align-items flex-start
      .song-img
        border-radius 10px
        height 100px
        width 100px
      span
        margin-top 4px
        width 100px
        font-size 8px
        no-wrap()
  .divider
    divider()
  .new-title
    display flex
    justify-content center
    align-items center
    justify-content space-between
    margin 10px 10px 10px 5px
    .new-left
      display flex
      div
        color grey
        padding 0 5px
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