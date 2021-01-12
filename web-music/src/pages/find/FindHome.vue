<template>
  <div class="content">
    <!-- 搜索 -->
    <div class="search">
      <i class="iconfont icon-faxian"></i>
      <div class="serach-wapper">
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
      </div>
      <i class="iconfont icon-faxian"></i>
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
        <img :src="item.coverImgUrl" alt class="song-img" />
        <span>{{item.name}}</span>
      </div>
    </div>
    <div v-if="playList.length>0" class="divider"></div>
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
      milddleTip: "发现页面",
      value: "",
      bannerList: [],
      findIcons: [],
      playList: []
    };
  },
  mounted() {
    this.iniData();
    this.bannerSwiperFn();
    this.playListFn();
  },
  methods: {
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
          this.playList = result.data.playlists.slice(0, 6);//返回50条数据截取数组前6
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  position fixed
  width 100%
  bottom 50px
  top 0
  .search
    margin-top 10px
    display flex
    justify-content center
    align-items center
    padding 0 10px
    .serach-wapper
      width 90%
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
        background-color pink
      span
        margin-top 4px
        width 100px
        font-size 8px
        no-wrap()
  .divider
    divider()
</style>