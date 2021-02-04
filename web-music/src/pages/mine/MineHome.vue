<template>
  <div class="content">
    <van-sticky @scroll="scroll">
      <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn" ref="title"></title-bar>
    </van-sticky>
    <!-- 头像区 -->
    <div class="user" v-if="loginState=='1'" @click="toUserPage">
      <img class="user-img" :src="profile.avatarUrl" :onerror="defaultImg" />
      <!-- <div class="user-img"  :style="{background: 'url(' + profile.avatarUrl + ')'}"></div> -->
      <div>{{profile.nickname}}</div>
      <i class="iconfont icon-jiantou"></i>
    </div>
    <div class="user" v-else @click="login">
      <div class="user-img"></div>
      <div>立即登录</div>
      <i class="iconfont icon-jiantou"></i>
    </div>
    <!-- 应用icon -->
    <div class="user-app">
      <div class="item" v-for="item in findIcons">
        <i :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="favorite-music" v-if="loginState=='1'" @click="toListDetail(firstItem.id)">
      <!-- TODO占位处理 -->
      <img class="icon" :src="firstItem.coverImgUrl" :onerror="defaultImg" />
      <div class="tip">
        <span>我喜欢的音乐</span>
        <span>{{firstItem.trackCount}}首</span>
      </div>
    </div>
    <div class="favorite-music" v-else>
      <!-- TODO占位处理 -->
      <div class="icon" />
      <div class="tip">
        <span>我喜欢的音乐</span>
        <span>0首</span>
      </div>
    </div>
    <!--歌单模块  -->
    <div class="song-list">
      <!-- swipeable滑动控制 animated转场动画 -->
      <van-tabs v-model="active" swipeable animated>
        <!--创建歌单  -->
        <van-tab title="创建歌单">
          <div class="setup-list">
            <div class="list-title">
              <span>创建歌单</span>
              <div class="icon">
                <i class="iconfont icon-hao" @click="setupList"></i>
                <i class="iconfont icon-gengduo" @click="setupList"></i>
              </div>
            </div>
            <div v-if="loginState=='1'">
              <album-list :list="createList" @toListDetail="toListDetail"></album-list>
            </div>
            <div v-else class="list-content-nodata">暂无新建歌单</div>
          </div>
        </van-tab>
        <!--收藏歌单 -->
        <van-tab title="收藏歌单">
          <div class="setup-list">
            <div class="list-title">
              <span>收藏歌单</span>
              <div class="icon">
                <i class="iconfont icon-gengduo"></i>
              </div>
            </div>
            <div v-if="loginState=='1'">
              <album-list :list="collectList" @toListDetail="toListDetail"></album-list>
            </div>
            <div v-else class="list-content-nodata">暂无收藏歌单</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部弹窗 -->
    <van-action-sheet title="标题" v-model="show" @select="onSelect" :safe-area-inset-bottom="true">
      <div class="sheetPop"></div>
    </van-action-sheet>
    <slider v-model="popShow"></slider>
  </div>
</template>
<script>
import AlbumList from "@/components/AlbumList";
import TitleBar from "@/components/TitleBar";

import Slider from "@/pages/find/component/Slider";
import { findIcons, popupIcons } from "../../assets/iconsdata/getIcons.js";
import api from "../../api/api.js";

export default {
  components: {
    TitleBar,
    Slider,
    AlbumList
  },
  data() {
    return {
      show: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      popShow: false,
      list: ["1", "2", "3", "3", "1", "2", "3", "3"],
      active: 2,
      milddleTip: "我的",
      loginState: "",
      profile: {},
      findIcons: [],
      playlist: [], //歌单
      createList: [], //创建歌单
      collectList: [], //收藏歌单
      firstItem: {},
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"' //默认图地址
    };
  },
  mounted() {
    // this.loginState = this.$store.state.loginState;
    // this.profile = this.$store.state.profile;
    this.loginState = localStorage.getItem("loginState");
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.iniData();
    if (this.loginState == "1") {
      this.userPlayListFn();
    }
  },
  activated() {
    this.popShow = false;
  },
  methods: {
    scroll(data) {
      console.log(`回调参数`, data); // {scrollTop:0,isFixed:true}
      if (data.scrollTop >= 42) {
        console.log(`ref`, this.$refs.title);
        this.$refs.title.$el.style.backgroundColor = "white"; //动态修改子组件样式
        this.milddleTip = this.profile.nickname;
      } else {
        this.$refs.title.$el.style.backgroundColor = "transparent";
        this.milddleTip = "我的";
      }
    },
    toUserPage() {
      this.$router.push("/UserHome", () => {});
    },
    toListDetail(id) {
      this.$router.push({
        path: "/ListHome",
        query: { id: id }
      });
    },
    setupList() {
      this.show = true;
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
    login() {
      this.$router.push({
        path: "/LoginHome"
      });
    },
    leftClickBtn() {
      console.log(this.popShow);
      this.popShow = true;
    },
    async iniData() {
      this.findIcons = findIcons();
    },
    userPlayListFn() {
      api
        .userPlayListFn(this.profile.userId)
        .then(result => {
          this.playlist = result.data.playlist; //原始列表
          this.firstItem = result.data.playlist.shift(); //删除首个元素，返回对象
          this.filterArr(result.data.playlist); //拆分为创建歌单与收藏歌单
        })
        .catch(err => {});
    },
    //歌单拆分
    filterArr(arr) {
      let createList = [];
      let collectList = [];
      arr.forEach(val => {
        if (val.subscribed === false) {
          createList.push(val);
        } else {
          collectList.push(val);
          ``;
        }
      });
      this.createList = createList;
      this.collectList = collectList;
      console.log(createList);
      console.log(collectList);
    }
  }
};
</script>

<style scoped  lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  background-color $color-background-grey
  height 100%
  .sheetPop
    height 200px
  .user
    display flex
    align-items center
    justify-content flex-start
    margin 10px
    font-size $font-size-small
    .user-img
      height 50px
      width 50px
      border-radius 50%
      background-color $color-background-white
    :nth-child(2)
      margin-left 10px
    i
      font-size $font-size-small
  .user-app
    border-radius 10px
    background-color #ffffff
    margin 10px
    display flex
    justify-content flex-start
    flex-wrap wrap
    align-items center
    .item
      flex 0 0 19.2%
      padding 10px
      width 50px
      height 50px
      display flex
      justify-content center
      align-items center
      flex-direction column
      :first-child
        font-size 30px
        color $color-theme
      span
        color grey
        font-size $font-size-small-s
        margin-top 5px
  .favorite-music
    height 80px
    margin 10px
    background-color #ffffff
    border-radius 10px
    display flex
    justify-content flex-start
    align-items center
    .icon
      line-height 50px
      text-align center
      margin-left 20px
      height 50px
      width 50px
      border-radius 10px
      background-color $color-background-grey
    // img去边框
    img[src=''], img:not([src])
      opacity 0
      background-color $color-background-grey
    .tip
      margin-left 10px
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      font-size $font-size-small
      span
        padding 2px
      :nth-child(2)
        color grey
  .song-list>>> .van-tabs__line
    background-color $color-theme
  .song-list>>> .van-ellipsis
    background-color $color-background-grey
  .song-list>>> .van-tab
    background-color $color-background-grey
    title()
  .setup-list
    margin 10px
    padding-bottom 20px
    border-radius 10px
    font-size $font-size-small
    background-color #ffffff
    .list-title
      padding 10px
      display flex
      justify-content space-between
      align-items center
      margin 10px
    .list-content-nodata
      display flex
      justify-content center
      align-items center
      height 100px
      color grey
</style>