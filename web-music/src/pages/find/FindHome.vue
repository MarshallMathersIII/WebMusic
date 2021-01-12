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
    <icon-list :icons='icons'></icon-list>
  </div>
</template>
<script>
import IconList from "../../components/IconList";
import api from "../../api/api.js";
import BannerSwiper from "./component/BannerSwiper";

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
      icons: [
        {
          text: "每日推荐",
          icon: "iconfont icon-faxian"
        },
        {
          text: "私人FM",
          icon: "iconfont icon-diantai"
        },
        {
          text: "歌单",
          icon: "iconfont icon-faxian"
        },
        {
          text: "排行榜",
          icon: "iconfont icon-faxian"
        },
        {
          text: "直播",
          icon: "iconfont icon-faxian"
        },
        {
          text: "数字专辑",
          icon: "iconfont icon-faxian"
        },
        {
          text: "唱聊",
          icon: "iconfont icon-faxian"
        },
        {
          text: "游戏专区",
          icon: "iconfont icon-faxian"
        }
      ]
    };
  },
  mounted() {
    api
      .bannerSwiperFn()
      .then(result => {
        console.log(result.data);
        this.bannerList = result.data.banners;
      })
      .catch(err => {});
  }
};
</script>

<style scoped lang="stylus">
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
</style>