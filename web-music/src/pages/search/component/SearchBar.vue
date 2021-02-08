<template>
  <div class="content">
    <div class="search-bar">
      <div class="search">
        <i class="iconfont icon-huatong1"></i>
        <input
          type="text"
          :placeholder="placeholder"
          v-model="searchVal"
          @keydown="keydown(searchVal)"
        />
        <i class="iconfont icon-huatong1" v-show="searchVal" @click="clear"></i>
      </div>
      <span @click="cancelClick">取消</span>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { isNull } from "base/utils";

export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    keydown(searchVal) {
      this.$emit("keydown", searchVal);
    },
    cancelClick() {
      this.$emit("cancelClick");
    },
    clear() {
      this.searchVal = "";
    },
    setSearchVal(val) {
      this.searchVal = val;
    }
  },
  created() {
    this.$watch("searchVal", function(newValue, oldValue) {
      this.$emit("searchValChange", newValue);
    });
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
.content
  .search-bar
    margin 10px
    display flex
    justify-content space-between
    align-items center
    .search
      flex 1
      height 40px
      background-color $color-background-grey
      border-radius 20px
      display flex
      justify-content flex-start
      align-items center
      margin-right 10px
      padding 0 10px
      input
        margin-left 10px
        flex 1
        background-color $color-background-grey
        height 100%
</style>