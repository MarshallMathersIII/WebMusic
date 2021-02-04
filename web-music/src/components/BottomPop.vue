<template>
  <div>
    <van-action-sheet v-model="vanPopup">
      <div class="sheet">
        <div class="sheet-up">
          <img :src="sheetItem.al.picUrl" class="left" />
          <div class="right">
            <span>{{sheetItem.name}}</span>
            <div class="artists">
              <span v-for="singer in sheetItem.ar">{{singer.name}}</span>
            </div>
          </div>
        </div>
        <!--TODO sheetItem.ar[0]拆分 -->
        <div class="sheet-item" @click="toSingerPage(sheetItem.ar[0].id)">
          <i class="iconfont icon-pinglun1"></i>
          <span>歌手：</span>
          <div class="artists">
            <span v-for="singer in sheetItem.ar">{{singer.name}}</span>
          </div>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>专辑：</span>
          <span>{{sheetItem.al.name}}</span>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>分享</span>
        </div>
        <div class="sheet-item">
          <i class="iconfont icon-pinglun1"></i>
          <span>评论</span>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
export default {
  name: "BottomPop",
  props: {
    sheetItem: {
      type: Object,
      default: function() {
        return {};
      }
    },
    popup: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    vanPopup: {
      get() {
        return this.popup;
      },
      set(value) {
          console.log(value)
        this.$emit("update:popup", value);
      }
    }
  },
  methods: {
    toSingerPage(id) {
      this.$emit("toSingerPage", id);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.sheet
  padding 0 10px
  margin-bottom 20px
  .sheet-up
    padding-left 4px
    height 80px
    display flex
    justify-content flex-start
    align-items center
    border-bottom 1px solid $color-background-grey
    .left
      border-radius 10px
      height 40px
      width 40px
    .right
      margin 10px
      display flex
      justify-content center
      align-items flex-start
      flex-direction column
      .artists
        display felx
        justify-content flex-start
        span
          padding-right 2px
        ::after
          content '/'
        :last-child::after
          content ''
  .sheet-item
    padding 4px
    display flex
    justify-content flex-start
    align-items center
    height 40px
    :nth-child(2)
      padding-left 8px
    .artists
      display felx
      justify-content flex-start
      span
        padding-right 2px
      ::after
        content '/'
      :last-child::after
        content ''
</style>