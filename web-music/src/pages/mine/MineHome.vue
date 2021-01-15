<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <!-- 头像区 -->
    <div class="user" v-if="loginState=='1'">
      <img class="user-img" :src="profile.avatarUrl" />
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
      <div class="icon">
        <i class="iconfont icon-huatong"></i>
      </div>
      <div class="tip">
        <span>我喜欢的音乐</span>
        <span>{{likeSongNum}}</span>
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
            <div class="list-content"></div>
          </div>
        </van-tab>
        <van-tab title="收藏歌单">
          <div class="setup-list">
            <div class="list-title">
              <span>收藏歌单</span>
              <div class="icon">
                <i class="iconfont icon-huatong"></i>
                <i class="iconfont icon-huatong"></i>
              </div>
            </div>
            <div class="list-content"></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="setup-list">
      <div class="list-title">
        <span>创建歌单</span>
        <div class="icon">
          <i class="iconfont icon-huatong"></i>
          <i class="iconfont icon-huatong"></i>
        </div>
      </div>
      <div class="list-content"></div>
    </div>-->
  </div>
</template>
<script>
import TitleBar from "@/components/Titlebar";
import { findIcons } from "../../assets/iconsdata/getIcons.js";
import api from "../../api/api.js";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      list: ["1", "2", "3", "3", "1", "2", "3", "3"],
      active: 2,
      milddleTip: "我的",
      loginState: "",
      profile: {},
      findIcons: [],
      likeSongNum: 0
    };
  },
  mounted() {
    // this.loginState = this.$store.state.loginState;
    // this.profile = this.$store.state.profile;
    this.loginState = localStorage.getItem("loginState");
    this.profile = JSON.parse(localStorage.getItem("profile"));
    console.log(this.loginState);
    console.log(this.profile);
    this.iniData();
    if (this.loginState == "1") {
      this.likeListFn();
    }
  },
  methods: {
    async iniData() {
      this.findIcons = findIcons();
    },

    likeListFn() {
      api
        .likeListFn(this.profile.userId)
        .then(result => {
          console.log(result.data);
          console.log(result.data.ids.length);
          this.likeSongNum = result.data.ids.length;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped  lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  background-color #e9e9e9
  height 1200px
  .user
    display flex
    align-items center
    justify-content flex-start
    margin 10px
    .user-img
      height 60px
      width 60px
      border-radius 50%
      background-color pink
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
      background-color #e9e9e9
    .tip
      margin-left 10px
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      span
        padding 2px
  .song-list>>> .van-tabs__line
    background-color pink
  .song-list>>> .van-ellipsis
    background-color #e9e9e9
  .song-list>>> .van-tab
    background-color #e9e9e9
  .setup-list
    margin 10px
    border-radius 10px
    background-color #ffffff
    .list-title
      padding 10px
      display flex
      justify-content space-between
      align-items center
      margin 10px
    .list-content
      height 100px
</style>