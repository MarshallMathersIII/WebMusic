<template>
  <div class="content">
    <div class="title"></div>
    <p>登录体验更多精彩</p>
    <p>未注册手机号登录自动创建账号</p>
    <input type="text" placeholder="请输入手机号" />
    <div class="btn" @click="btnClick">下一步</div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    btnClick() {
    //   axios.get('/api/cellphone/existence/check?phone=17621659771').then();
      axios.get('/api/cellphone/existence/check',{
          params:{
              phone:'17621659771'
          }
      }).then((res)=>{
          console.log(res.data)
      })
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
  .title
    height 60px
    background pink
  p
    margin-left 10px
    margin-top 10px
  input
    margin-left 10px
    margin-top 10px
  .btn
    btn()
</style>