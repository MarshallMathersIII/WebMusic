<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <p style="font-size:16px">登录体验更多精彩</p>
    <p style="color:grey">未注册手机号登录自动创建账号</p>
    <!-- TODO后续改为手机号类型 -->
    <van-field v-model="phone" type="number" placeholder="请输入手机号" />
    <div v-if="btnShow" class="btn" @click="btnClick">下一步</div>
    <div v-else class="btn-inactive">下一步</div>
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
      milddleTip: "手机号登录",
      phone: "",
      btnShow: false
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
  },
  //输入监听控制按钮样式
  computed: {
    watchBtnState() {
      !!this.phone ? (this.btnShow = true) : (this.btnShow = false);
    }
  },
  watch: {
    watchBtnState() {}
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
    margin 15px
  input
    margin 15px
  .btn
    btn()
  .btn-inactive
    btn-inactive()
</style>