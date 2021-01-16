<template>
  <div class="content">
    <div class="btn" @click="btn()">测试</div>
    <div>{{this.$store.state.login}}</div>
    <div class="btn" @click="btn1()">接口测试</div>
  </div>
</template>
<script>
import api from "../../api/api.js";

export default {
  mounted() {
  },
  methods: {
    loginStatusFn() {
      api
        .loginStatusFn()
        .then(result => {
          console.log(result.data);
          this.bannerList = result.data.banners;
        })
        .catch(err => {
          console.log(err);
        });
    },
    btn() {
      this.$store.commit("LOGIN_STATE", "ejhnn");
    },
    btn1() {
      this.loginStatusFn();
    },
    recommendSongFn() {
      this.$store.commit("SET_TOKEN", "");

      localStorage.removeItem("token");

      api
        .recommendSongFn()
        .then(result => {
          console.log(result.data);
          this.bannerList = result.data.banners;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
// stylus引入
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  background-color $color-background
  position fixed
  width 100%
  bottom 60px
  top 0
  no-wrap()
  .btn
    btn()
</style>