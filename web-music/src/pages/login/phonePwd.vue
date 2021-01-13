<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
    <van-field v-model="pwd"  type="password" placeholder="请输入密码" />
    <div v-if="btnShow" class="btn" @click="btnClick">立即登录</div>
    <div v-else class="btn-inactive">立即登录</div>
  </div>
</template>
<script>
import axios from "axios";
import api from "../../api/api.js";
import TitleBar from "../../components/Titlebar";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      value: "",
      btnShow: false,
      phone: "",
      pwd: "",
      milddleTip: "账号密码登录"
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
            path: "/FindHome"
          });
        })
        .catch(err => {});
    }
  },
  //输入监听控制按钮样式
  computed: {
    watchBtnState() {
      !!this.pwd ? (this.btnShow = true) : (this.btnShow = false);
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
    margin-left 10px
    margin-top 10px
  input
    margin-left 10px
    margin-top 10px
  .btn
    btn()
  .btn-inactive
    btn-inactive()
</style>