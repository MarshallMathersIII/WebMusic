<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <p>登录体验更多精彩</p>
    <p>未注册手机号登录自动创建账号</p>
    <input type="text" placeholder="请输入手机号" />
    <div class="btn" @click="btnClick">下一步</div>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/api/api.js";
import TitleBar from "@/components/Titlebar";

export default {
  components: {
    TitleBar
  },
  data() {
   return {
      milddleTip: "登录"
    };
  },
  methods: {
    btnClick() {
      api
        .phoneRegisteredFn(this.phone)
        .then(result => {
          console.log(result.data);
          this.$router.push({
            path: "/PhonePwd",
            query: { phone: this.phone }
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