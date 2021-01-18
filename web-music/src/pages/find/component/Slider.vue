<template>
  <!-- 封装popup参考：https://blog.csdn.net/gp3098/article/details/104407980 -->
  <div class="content">
    <!-- TODO:popu滑动穿透 -->
    <van-popup
      :zIndex="20000"
      :value="value"
      @input="val => this.$emit('input', val)"
      :close-on-popstate="true"
      position="left"
      :style="{ height: '100%',width:'80%'}"
    >
      <div class="popup-content">
        <!-- popup头部 -->
        <div @click="toUserPage()" class="user" v-if="loginState=='1'">
          <img class="user-img" :src="profile.avatarUrl" />
          <div>{{profile.nickname}}</div>
          <i class="iconfont icon-jiantou"></i>
        </div>
        <div @click="toUserPage()" class="user" v-else>
          <div class="user-img"></div>
          <div>立即登录</div>
          <i class="iconfont icon-jiantou"></i>
        </div>
        <!-- popup上半区 -->
        <div class="setting">
          <div class="item-wapper">
            <div class="title">其他</div>
            <div class="divider"></div>
            <div
              class="item"
              v-for="(item,index) in popupIcons"
              :key="index"
              @click="sliderUpBtn(index)"
            >
              <div class="left">
                <i :class="item.icon"></i>
                <p>{{item.text}}</p>
              </div>
              <div class="right">
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- popup下半区 -->
        <div class="setting">
          <div class="item-wapper">
            <div class="item" v-for="(item,index) in findIcons.slice(0,4)" :key="index">
              <div class="left">
                <i class="iconfont icon-diantai"></i>
                <p>电台</p>
              </div>
              <div class="right">
                <i class="iconfont icon-jiantou"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loginState=='1'" class="btn" @click="handleBtn">退出登录</div>
      </div>
    </van-popup>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>
<script>
import api from "../../../api/api.js";
import { btnType } from "../../../base/config.js";
import { findIcons, popupIcons } from "@/assets/iconsdata/getIcons.js";
export default {
  name: "Slider",
  data() {
    return {
      findIcons: [],
      popupIcons: [],
      loginState: "",
      profile: {},
      showShare: false,
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" }
      ]
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    popShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //TODO 路由封装
    toUserPage() {
      // this.$router.push({
      //   path: "/RadioHome"
      // });
      // 修复路由重定向报错 Error: Redirected from X to Y via a navigation guard.
      this.$router.push("/RadioHome", () => {});
    },

    handleBtn() {
      this.$dialog
        .confirm({
          title: "网易云音乐",
          message: "确定退出当前登录账号吗？"
        })
        .then(() => {
          this.logoutFn();
          localStorage.removeItem("loginState");
          localStorage.removeItem("profile");
          this.$router.push({
            path: "/LoginHome"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    logoutFn() {
      api
        .logoutFn()
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    iniData() {
      this.findIcons = findIcons();
      this.popupIcons = popupIcons();
      console.log(this.popupIcons);
    },
    //点击事件常量映射
    sliderUpBtn(type) {
      switch (type) {
        case btnType.setting:
          this.$toast(type);
          break;
        case 1:
          this.$toast(type);
          break;
        case 2:
          this.$toast(type);
          break;
        case 3:
          this.$toast(type);
          break;
        case 4:
          this.$toast(type);
          break;
        case 5:
          this.$toast(type);
          break;
        case btnType.share:
          this.showShare = true;
          break;
        case 7:
          this.$toast(type);
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.loginState = localStorage.getItem("loginState");
    this.profile = JSON.parse(localStorage.getItem("profile"));
    console.log(this.loginState);
    console.log(this.profile);
    this.iniData();
  }
};
</script>

<style scoped lang="stylus">
@import '../../../assets/styles/variable'
@import '../../../assets/styles/mixin'
.van-popup
  background-color $color-background-grey
  .popup-content
    .user
      display flex
      align-items center
      justify-content flex-start
      margin 40px 10px 40px 10px
    .user-img
      height 40px
      width 40px
      border-radius 50%
      background-color $color-background-white
      margin-right 10px
    .setting
      margin 10px
      border-radius 10px
      background-color $color-background-white
      .item-wapper
        margin 10px
        .title
          height 40px
          line-height 40px
        .divider
          divider-1()
        .item
          height 40px
          display flex
          justify-content space-between
          align-items center
          .left
            display flex
            justify-content center
            align-items center
            :nth-child(2)
              margin-left 10px
    .btn
      margin 20px 10px
      height 40px
      background-color $color-background-white
      color $color-theme
      line-height 40px
      text-align center
      border-radius 5px
</style>