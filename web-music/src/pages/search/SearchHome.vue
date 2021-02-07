<template>
  <div class="content">
    <search-bar ref="searchBar" @cancelClick="cancelClick" @keydown="keydown"></search-bar>
    <search-history @itemClick="itemClick" @clearHistory="clearHistory"></search-history>
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
import SearchHistory from "./component/SearchHistory";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      tempList: []
    };
  },
  components: {
    SearchBar,
    SearchHistory
  },
  methods: {
    clearHistory() {
      this.setSearchList([]);
    },
    itemClick(index) {
      this.$refs.searchBar.setSearchVal(this.searchList[index]);
      console.log(index);
    },
    cancelClick() {
      console.log("cancelClick");
    },
    keydown(val) {
      this.tempList.push(val);
      this.setSearchList(this.tempList.slice());
    },
    ...mapMutations({
      setSearchList: "SET_SEARCH_LIST"
    })
  },
  computed: {
    ...mapGetters(["searchList"])
  }
};
</script>

<style scoped lang="stylus">
// stylus引入
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
</style>