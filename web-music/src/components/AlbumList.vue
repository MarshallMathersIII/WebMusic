<template>
  <div class="content">
    <div class="wapper" v-if="albumType===0">
      <div class="list-content" v-for="item in list" @click="toListDetail(item.id)">
        <img class="left" v-lazy="item.coverImgUrl" />
        <div class="right">
          <span>{{item.name}}</span>
          <span>{{item.trackCount}}首</span>
        </div>
      </div>
    </div>
    <div class="wapper" v-else>
      <div class="list-title">
        <span>按时间排序</span>
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div class="list-content" v-for="item in list" @click="toListDetail(item.id)">
        <img class="left" v-lazy="item.blurPicUrl" />
        <div class="right">
          <span>{{item.name}}</span>
          <span>{{item.publishTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumList",
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    albumType: {
      type: Number,
      default: 0
    }
  },
  methods: {
    toListDetail(id) {
      this.$emit("toListDetail", id);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '../assets/styles/variable'
@import '../assets/styles/mixin'
.content
.wrapper
  background-color #fff
.list-title
  display flex
  margin 0 20px
  justify-content space-between
  align-items center
  height 30px
  padding 10px 0
  :first-child
    color black
.list-content
  padding 5px 20px
  display flex
  justify-content flex-start
  align-items center
  background-color #fff
  .left
    height 50px
    width 50px
    border-radius 10px
  .right
    margin-left 10px
    display flex
    justify-content center
    align-items baseline
    flex-direction column
    :nth-child(2)
      tips()
      margin-top 4px
</style>