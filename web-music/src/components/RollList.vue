<template>
  <div>
    <div class="content">
      <div class="song-title">
        <div>{{title.leftText}}</div>
        <div class="more">{{title.rightText}}</div>
      </div>
      <div class="wapper">
        <div class="song-list">
          <div class="song-item" v-for="(item) in list">
            <img
              v-lazy="item.picUrl"
              class="song-img"
              v-if="type=='1'"
              :onerror="defaultImg"
            />
            <img v-lazy="item.coverImgUrl" class="song-img" v-else />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RollList",
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
    },
    type: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.content
  margin-bottom 10px
  .song-title
    display flex
    justify-content space-between
    align-items center
    margin 14px 10px 0 10px
    title()
  .wapper
    overflow hidden
    height 0px
    padding-bottom 38%
    .song-list
      display flex
      justify-content center
      align-items center
      justify-content space-between
      overflow-x auto
      overflow-y hidden
      .song-item
        height 130px
        padding 10px
        white-space nowrap
        display flex
        flex-direction column
        justify-content center
        align-items flex-start
        .song-img
          border-radius 10px
          height 100px
          width 100px
        span
          margin-top 4px
          width 100px
          font-size $font-size-small
          no-wrap()
</style>