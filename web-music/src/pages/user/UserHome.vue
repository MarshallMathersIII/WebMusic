<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <singer-info :name="name" :fans="fans" :type="type"></singer-info>
    <div></div>
    <div class="wapper">
      <div class="user-info">
        <span class="info-title">基本信息</span>
        <span>村龄：87238178</span>
        <span>性别：男</span>
        <span>年龄：20</span>
        <span>地区：上海</span>
        <span>大爷：其他对象</span>
        <span class="info-title">个人简介</span>
        <span>狄拉克手机丢了卡就是肯德基卢卡斯大水坑里见到了空间</span>
      </div>
      <div class="kong"></div>
    </div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SingerInfo from "@/components/SingerInfo";
export default {
  components: {
    TitleBar,
    SingerInfo
  },
  data() {
    return {
      active: 3,
      playlist: {},
      tracks: [],
      subscribers: [],
      milddleTip: "歌手",
      id: "102019",
      name: "gil scott-heron",
      fans: "20100",
      type: 1, //1:用户主页 2:歌手主页
      bgUrl:
        "http://p1.music.126.net/VRRQf1OR0_I-tGpi2_B6lQ==/109951164656872272.jpg",
      profile: {}
    };
  },
  mounted() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    console.log(this.profile);
  },
  methods: {
    leftClickBtn() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  .wapper
    background-color $color-background-grey
    margin-bottom 100px
    .user-info
      height 400px
      background-color white
      border-radius 10px
      margin 20px 20px
      display flex
      justify-content flex-start
      align-items flex-start
      flex-direction column
      padding 10px
      .info-title
        font-weight bold
        font-size 16px
        color black
      span
        line-height 20px
        padding 6px
        font-size 8px
        color grey
    .kong
      height 1px
</style>