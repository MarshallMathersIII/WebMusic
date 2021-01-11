<template>
  <div class="content">
    <div class="search">
      <i class="iconfont icon-faxian"></i>
      <div class="serach-wapper">
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" />
      </div>
      <i class="iconfont icon-faxian"></i>
    </div>
  </div>
</template>
<script>
import TitleBar from "../../components/Titlebar";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      milddleTip: "发现页面",
      value:""
    };
  }
};
</script>

<style scoped lang="stylus">
.content
  position fixed
  width 100%
  bottom 50px
  top 0
  .search
    margin-top 10px;
    display flex
    justify-content center
    align-items center
    padding 0 10px
    .serach-wapper
        width 90%
</style>