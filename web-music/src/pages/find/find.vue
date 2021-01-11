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
    <!-- Icon -->
    <div class="icons">
      <div class="icon-wrapper">
        <div class="icon-item" v-for="item in bannerList">
          <i class="iconfont icon-faxian"></i>
          <span>每日推荐</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TitleBar from "../../components/Titlebar";
import api from "../../api/api.js";
import BannerSwiper from "./component/BannerSwiper";

export default {
  components: {
    TitleBar,
    BannerSwiper
  },
  data() {
    return {
      milddleTip: "发现页面",
      value: "",
      bannerList: []
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
  .icons
    // 外层容器高度低于子元素，hidden隐藏进度条
    overflow hidden
    height 70px
    .icon-wrapper
      height 80px
      display flex
      align-items center
      justify-content space-between
      overflow-x auto
      overflow-y hidden
      // 解决ios手机页面滑动卡顿问题
      overflow-scrolling touch
      .icon-item
        padding 10px
        white-space nowrap
        display flex
        flex-direction column
        justify-content center
        align-items center
        .iconfont
          font-size 38px
        span
          font-size 6px
</style>