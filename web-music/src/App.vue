<template>
  <div id="app">
    <tab></tab>
    <!-- TODO keep-alive缓存popup状态，无法关闭-->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Tab from "./pages/base-tab";
import { Toast } from "vant";
import { mapState } from "vuex";


export default {
  components: {
    Tab
  },
  methods: {},
  computed: {
    ...mapState(["isAppending"])
  },
  //监听请求Loading状态值改变
  watch: {
    isAppending(val) {
      console.log("isApending", val);
      val
        ? Toast.loading({
            message: "加载中",
            duration: 0,
            forbidClick: true
          })
        : Toast.clear();
    }
  }
};
</script>

<style scoped lang="stylus"></style>
