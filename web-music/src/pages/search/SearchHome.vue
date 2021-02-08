<template>
  <div class="content">
    <search-bar
      ref="searchBar"
      @cancelClick="cancelClick"
      @keydown="keydown"
      @searchValChange="searchValChange"
      :placeholder="placeholder"
    ></search-bar>
    <search-history @itemClick="itemClick" @clearHistory="clearHistory"></search-history>
    <search-suggest
      :val="val"
      :hotList="hotList"
      :suggestList="suggestList"
      @hotItemClick="hotItemClick"
    ></search-suggest>
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
import SearchSuggest from "./component/SearchSuggest";
import { mapGetters, mapMutations } from "vuex";
import { isNull } from "base/utils";

export default {
  data() {
    return {
      tempList: [],
      val: "",
      hotList: [],
      suggestList: [],
      placeholder: ""
    };
  },
  mounted() {
    this.hotSearchListFn(); //热搜榜
    this.defaultSearchFn(); //默认搜索词
  },
  components: {
    SearchBar,
    SearchHistory,
    SearchSuggest
  },
  methods: {
    hotItemClick(item) {
      console.log(item);
      this.$refs.searchBar.setSearchVal(item.searchWord);
    },
    suggestSearchFn(keyWords) {
      api
        .suggestSearchFn(keyWords, "mobile")
        .then(result => {
          console.log(result.data.result.allMatch);
          this.suggestList = result.data.result.allMatch;
        })
        .catch(err => {});
    },
    defaultSearchFn() {
      api
        .defaultSearchFn()
        .then(result => {
          this.placeholder = result.data.data.showKeyword;
        })
        .catch(err => {});
    },
    hotSearchListFn() {
      api
        .hotSearchListFn()
        .then(result => {
          this.hotList = result.data.data;
        })
        .catch(err => {});
    },
    searchValChange(val) {
      this.val = val;
      if (isNull(this.val)) {
        return;
      }
      this.suggestSearchFn(this.val);
    },
    clearHistory() {
      this.tempList = [];
      this.setSearchList([]);
    },
    itemClick(index) {
      this.$refs.searchBar.setSearchVal(this.searchList[index]);
      console.log(index);
    },
    cancelClick() {
      this.$router.back(-1);
    },
    keydown(val) {
      // this.tempList.push(val);
      // this.setSearchList(this.tempList.slice());
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