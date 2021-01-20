<template>
  <div class="content">
    <div class="title">
      <div>{{title.leftText}}</div>
      <div class="more">{{title.rightText}}</div>
    </div>
    <!-- TODO 最后一行不满三个左对齐 -->
    <div class="grid">
      <div class="item" v-for="item in list">
        <img class="img" :src="item.picUrl"  :onerror="defaultImg" />
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GridList",
  data() {
    return {
      defaultImg: 'this.src="' + require("../assets/img/lazy_load.png") + '"' //默认图地址
    };
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    title: {
      type: Object,
      default: function() {
        return {
          leftText: "智能推荐",
          rightText: "更多"
        };
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.title
  display flex
  justify-content space-between
  align-items center
  margin 14px 10px 10px 10px
  title()
.grid
  display flex
  align-items center
  justify-content flex-start
  flex-wrap wrap
  .item
    display flex
    justify-content center
    align-items center
    flex-direction column
    flex 1
    margin-bottom 10px
    .img
      border-radius 10px
      height 100px
      width 100px
      background $color-background-grey
    span
      font-size $font-size-small
      margin-top 5px
      width 100px
      no-wrap()
</style>