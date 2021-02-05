<template>
  <!-- TODO vant按需引入样式修改 -->
  <div class="content">
    <van-sticky>
      <title-bar :milddleTip="milddleTip" @leftBtn="onClickLeft" :leftIcon="leftIcon" ref="title"></title-bar>
    </van-sticky>
    <!-- 横向滚动 -->
    <roll-list :list="djPaygiftList" :title="title" :type="rollType"></roll-list>
    <!-- 轮播图 -->
    <banner-swiper :bannerList="djBannerList"></banner-swiper>
    <!-- Grid组件 -->
    <grid-list :title="title" :list="djPaygiftList"></grid-list>
  </div>
</template>
<script>
import api from "api/api.js";
import RollList from "components/RollList";
import GridList from "components/GridList";
import BannerSwiper from "components/BannerSwiper";
import TitleBar from "@/components/TitleBar";

import { Toast } from "vant";

export default {
  data() {
    return {
      softShow: false,
      milddleTip: "电台",
      leftIcon: "iconfont icon-gongnengtubiao-86",
      djBannerList: [],
      djPaygiftList: [],
      title: {
        leftText: "精品电台",
        rightText: "更多"
      },
      rollType: "1",
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"' //默认图地址
    };
  },
  components: {
    RollList,
    BannerSwiper,
    GridList,
    TitleBar
  },
  mounted() {
    this.djPerferedFn();
    this.djBannerFn();
    this.djPaygiftFn();
    this.$refs.title.$el.style.backgroundColor = "white";
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    djBannerFn() {
      api
        .djBannerFn()
        .then(result => {
          this.djBannerList = result.data.data;
        })
        .catch(err => {});
    },
    djPerferedFn() {
      api
        .djPerferedFn()
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    djPaygiftFn() {
      api
        .djPaygiftFn()
        .then(result => {
          console.log(result.data.data.list);
          this.djPaygiftList = result.data.data.list.slice(0, 9);
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped lang="stylus">
// stylus引入
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  background-color white
  height 100%
  padding-bottom 60px
.content >>> .van-nav-bar__text
  color black
.content >>> .van-nav-bar .van-icon
  color black
.content >>> .van-nav-bar__content
  background-color white
  height 60px
</style>