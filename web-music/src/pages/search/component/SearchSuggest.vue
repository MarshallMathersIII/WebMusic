<template>
  <div class="content">
    <!-- 热搜榜 -->
    <div class="hot" v-if="val==''">
      <div class="title">
        <span>热搜榜</span>
        <span>播放</span>
      </div>
      <div class="list">
        <div
          v-for="(item,index) in hotList"
          :key="index"
          class="item"
          @click="hotItemClick(item)"
        >{{index+1+" "+ item.searchWord}}</div>
      </div>
    </div>
    <!-- 搜索提示 -->
    <div class="suggest" v-else>
      <div class="suggest-title">搜索 "{{val}}"</div>
      <div class="suggest-item" v-for="item in suggestList" @click="suggestItemClick(item)">
        <i class="iconfont icon-huatong1"></i>
        <span>{{item.keyword}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { List } from "vant";
export default {
  name: "SearchSuggest",
  props: {
    hotList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    suggestList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    val: {
      type: String,
      default: ""
    }
  },
  methods: {
    suggestItemClick(item) {
      this.$emit("suggestItemClick", item);
    },
    hotItemClick(item) {
      this.$emit("hotItemClick", item);
    }
  }
};
</script>

<style scoped lang="stylus">
// stylus引入
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  margin 30px 14px
  .hot
    background-color #fff
    .title
      display flex
      justify-content space-between
      align-items center
      margin-bottom 10px
      font-weight bold
    .list
      display flex
      flex-flow row wrap
      justify-content flex-start
      align-items center
      .item
        flex 0 0 50%
        padding 6px 0
        font-size 8px
        color grey
        no-wrap()
  .suggest
    display flex
    align-items flex-start
    justify-content center
    flex-direction column
    .suggest-title
      margin-bottom 10px
      color #6595bf
    .suggest-item
      padding 6px 0
      color grey
</style>