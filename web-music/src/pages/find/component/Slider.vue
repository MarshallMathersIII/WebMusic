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
        <div @click="toUserPage()" class="user">
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
              @click="sliderBtn(index)"
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
            <div
              class="item"
              v-for="(item,index) in findIcons.slice(0,4)"
              :key="index"
              @click="sliderBtn(index)"
            >
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
        <div class="btn">退出登录</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import api from "@/api/api.js";
import { findIcons, popupIcons } from "@/assets/iconsdata/getIcons.js";
export default {
  name: "Slider",
  data() {
    return {
      findIcons: [],
      popupIcons: []
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
    iniData() {
      this.findIcons = findIcons();
      this.popupIcons = popupIcons();
      console.log(this.popupIcons);
    }
  },
  mounted() {
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
      padding 40px 10px 10px 10px
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
          margin-top 24px
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