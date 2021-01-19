<template>
  <div class="content">
    <div class="title">
      <div>{{title.leftText}}</div>
      <div class="more">{{title.rightText}}</div>
    </div>
    <div class="grid">
      <div class="item" v-for="item in list">
        <img class="img" :src="item.picUrl" />
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
  font-size 16px
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
      background pink
    span
      margin-top 5px
      width 100px
      no-wrap()
</style>