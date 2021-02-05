<template>
  <div class="content">
    <search-bar @cancelClick="cancelClick"></search-bar>
  </div>
</template>
<script>
import api from "api/api.js";
import RollList from "components/RollList";
import GridList from "components/GridList";
import BannerSwiper from "components/BannerSwiper";
import TitleBar from "@/components/TitleBar";
import { Toast } from "vant";
import SearchBar from "./component/SearchBar";
export default {
  components: {
    SearchBar
  },
  methods: {
    cancelClick() {
      console.log("cancelClick")
    }
  }
};
</script>

<style scoped lang="stylus">
// stylus引入
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  .search-bar
    margin 10px
    display flex
    justify-content space-between
    align-items center
    .search
      width 76%
      height 40px
      background-color $color-background-grey
      border-radius 20px
      display flex
      justify-content flex-start
      align-items center
      padding 0 20px
      input
        margin-left 10px
        flex 1
        background-color $color-background-grey
</style>