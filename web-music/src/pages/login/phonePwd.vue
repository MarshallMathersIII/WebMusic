<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <input type="text" placeholder="请输入密码" />
    <div class="btn" @click="btnClick">登录</div>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../api/api.js";
import TitleBar from '../../components/Titlebar'

export default {
   components:{
        TitleBar
    },
  data() {
    return {
      phone: "",
      pwd: "gil931214",
      milddleTip: "登录"
    };
  },
  mounted() {
    this.phone = this.$route.query.phone;
    console.log(this.$route.query.phone);
  },
  methods: {
    btnClick() {
      api
        .phoneLoginFn(this.phone, this.pwd)
        .then(result => {
          console.log(result.data);
          this.$router.push({
            path: "/find"
          });
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'
.content
  position fixed
  width 100%
  bottom 60px
  top 0
  p
    margin-left 10px
    margin-top 10px
  input
    margin-left 10px
    margin-top 10px
  .btn
    btn()
</style>