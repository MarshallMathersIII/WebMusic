<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <singer-info :name="profile.nickname" :fans="profile.followeds" :type="type" :bgUrl="profile.backgroundUrl" :avatarUrl="avatarUrl"></singer-info>
    <div></div>
    <div class="wapper">
      <div class="user-info">
        <span class="info-title">基本信息</span>
        <span>性别：{{gender |filterGender}}</span>
        <span>年龄：{{birthday | filterDate | filterAge}}岁</span>
        <span>地区：上海</span>
        <span class="info-title">个人简介</span>
        <span>{{signature |capitalize}}</span>
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
      name: "",
      fans: 0,
      type: 1, //1:用户主页 2:歌手主页
      bgUrl: "",
      profile: {},
      avatarUrl: "",
      signature: "dklkasdlklasda",
      gender: 0,
      birthday: 0,
      city: 0,
      province: 0
    };
  },
  mounted() {
    this.profile = JSON.parse(localStorage.getItem("profile"));
    this.bgUrl = this.profile.backgroundUrl;
    this.name = this.profile.nickname;
    this.fans = this.profile.followeds;
    this.avatarUrl = this.profile.avatarUrl;
    this.signature = this.profile.signature;
    this.gender = this.profile.gender;
    this.birthday = this.profile.birthday;
    this.city = this.profile.city;
    this.province = this.profile.province;
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
      height 300px
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