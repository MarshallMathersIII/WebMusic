<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <!-- 头像区 -->
    <div class="user" v-if="loginState=='1'">
      <img class="user-img" :src="profile.avatarUrl" @click="showPopup" />
      <!-- <div class="user-img"  :style="{background: 'url(' + profile.avatarUrl + ')'}"></div> -->
      <div>{{profile.nickname}}</div>
      <i class="iconfont icon-huatong"></i>
    </div>
    <div class="user" v-else>
      <div class="user-img"></div>
      <div>立即登录</div>
      <i class="iconfont icon-huatong"></i>
    </div>
    <!-- 应用icon -->
    <div class="user-app">
      <div class="item" v-for="item in findIcons">
        <i :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
    <!-- 我喜欢的音乐 -->
    <div class="favorite-music">
      <!-- TODO占位处理 -->
      <img class="icon" :src="firstItem.coverImgUrl" />
      <div class="tip">
        <span>我喜欢的音乐</span>
        <span>{{firstItem.trackCount}}首</span>
      </div>
    </div>
    <!--歌单模块  -->
    <div class="song-list">
      <van-tabs v-model="active">
        <van-tab title="创建歌单">
          <div class="setup-list">
            <div class="list-title">
              <span>创建歌单</span>
              <div class="icon">
                <i class="iconfont icon-huatong"></i>
                <i class="iconfont icon-huatong"></i>
              </div>
            </div>
            <div class="list-content" v-for="item in createList ">
              <img class="left" :src="item.coverImgUrl" />
              <div class="right">
                <span>{{item.name}}</span>
                <span>{{item.trackCount}}首</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="收藏歌单">
          <div class="setup-list">
            <div class="list-title">
              <span>收藏歌单</span>
              <div class="icon">
                <i class="iconfont icon-huatong"></i>
              </div>
            </div>
            <div class="list-content" v-for="item in collectList ">
              <img class="left" :src="item.coverImgUrl" />
              <div class="right">
                <span>{{item.name}}</span>
                <span>{{item.trackCount}}首</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <slider v-model="popShow"></slider>
  </div>
</template>
<script>
import TitleBar from "@/components/Titlebar";
import Slider from "@/pages/find/component/Slider";
import { findIcons, popupIcons } from "../../assets/iconsdata/getIcons.js";
import api from "../../api/api.js";

export default {
  components: {
    TitleBar,
    Slider
  },
  data() {
    return {
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
      firstItem: {}
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
  methods: {
    showPopup() {
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
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  background-color $color-background-grey
  height 100%
  padding-bottom 60px
  position: absolute
  .user
    display flex
    align-items center
    justify-content flex-start
    margin 10px
    .user-img
      height 60px
      width 60px
      border-radius 50%
      background-color $color-background-white
    :nth-child(2)
      margin-left 10px
  .user-app
    border-radius 10px
    background-color #ffffff
    margin 10px
    display flex
    justify-content flex-start
    flex-wrap wrap
    align-items center
    .item
      flex 0 0 19.8%
      padding 10px
      width 50px
      height 50px
      display flex
      justify-content center
      align-items center
      flex-direction column
      :first-child
        font-size 30px
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
    .tip
      margin-left 10px
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      span
        padding 2px
  .song-list>>> .van-tabs__line
    background-color $color-theme
  .song-list>>> .van-ellipsis
    background-color $color-background-grey
  .song-list>>> .van-tab
    background-color $color-background-grey
  .setup-list
    margin 10px
    padding-bottom 20px
    border-radius 10px
    background-color #ffffff
    .list-title
      padding 10px
      display flex
      justify-content space-between
      align-items center
      margin 10px
    .list-content
      padding 5px 0
      margin 0 20px
      display flex
      justify-content flex-start
      align-items center
      .left
        height 50px
        width 50px
        background-color grey
        border-radius 10px
      .right
        margin-left 10px
        display flex
        justify-content center
        align-items baseline
        flex-direction column
</style>