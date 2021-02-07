<template>
  <div class="content">
    <div class="history" v-if="searchList.length>0">
      <span class="tab">历史</span>
      <div class="wapper">
        <span
          class="item"
          v-for="(item,index) in searchList"
          :key="index"
          @click="itemClick(index)"
        >{{item}}</span>
      </div>
      <i class="iconfont icon-jiantou" @click="clearHistory"></i>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "SearchHistory",
  props: {
    placeholder: {
      type: String,
      default: "请输入哦"
    }
  },
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    itemClick(index) {
      this.$emit("itemClick", index);
    },
    cancelClick() {
      this.$emit("cancelClick");
    },
    clearHistory() {
      this.$emit("clearHistory");
    }
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
  .history
    padding 0 10px
    height 50px
    background-color white
    display flex
    align-items center
    justify-content flex-start
    .wapper
      overflow-x auto
      overflow-y hidden
      white-space nowrap
      display flex
      flex 1
      .item
        background-color $color-background-grey
        border-radius 20px
        padding 4px 10px
        margin-left 4px
    .tab
      width 30px
      padding-right 10px
    .iconfont
      text-align right
      width 30px
</style>