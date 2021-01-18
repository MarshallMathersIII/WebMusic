<template>
  <!-- TODO vant按需引入样式修改 -->
  <div class="content">
    <van-nav-bar
      :border="false"
      title="电台"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <roll-list></roll-list>
  </div>
</template>
<script>
import api from "../../api/api.js";
import RollList from "@/components/RollList";

import { Toast } from "vant";

export default {
   components: {
    RollList
  },
  mounted() {},
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
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
.content >>> .van-nav-bar__text
  color black
.content >>> .van-nav-bar .van-icon
  color black
</style>