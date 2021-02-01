<template>
  <div>
    <div class="wrapper">
      <!-- v-if当数据请求完成创建，默认显示第一张 不出现逻辑代码 -->
      <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in bannerList" :key="index">
          <img
            class="swiper-img"
            :src="item.pic"
            :onerror="defaultImg"
            @click="itemClick(item.song,item.targetType)"
          />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>
<script>
export default {
  name: "BannerSwiper",
  props: {
    bannerList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: 3000
      },
      defaultImg: 'this.src="' + require("../assets/img/lazy_load.png") + '"' //默认图地址
    };
  },
  mounted() {},
  computed: {
    showSwiper() {
      return this.bannerList.length;
    }
  },
  methods: {
    itemClick(song, type) {
      if (type !== 1) {
        return;
      }
      this.$emit("bannerClick", song);
    }
  }
};
</script>

<style scoped lang="stylus">
// 样式穿透swiper-pagination-bullet-active属于swiper组件内容，因scoped限制，需要穿透设置
.wrapper >>> .swiper-pagination-bullets
  bottom 10px
  left 0
  width 100%
.wrapper >>> .swiper-pagination-bullet
  background #000
  opacity 0.5
.wrapper >>> .swiper-pagination-bullet-active
  background #fff
  opacity 1
.wrapper
  margin 0 10px
  border-radius 10px
  overflow hidden
  background $color-background-grey
  height 0
  padding-bottom 37%
  .swiper-img
    width 100%
</style>