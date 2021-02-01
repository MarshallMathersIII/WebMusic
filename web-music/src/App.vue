<template>
  <div id="app">
    <tab v-if="$route.meta.footShow"></tab>
    <keep-alive v-if="$route.meta.keepAlive">
      <!--同组件不同参数缓存策略 :key="$route.fullPath" -->
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player :fullScreen="fullScreen" v-if="playlist.length>0" :isBottom="!$route.meta.footShow"></player>
    <!-- TODO侧滑栏全局控制 -->
  </div>
</template>

<script>
import Tab from "./pages/base-tab";
import Player from "./pages/player/Player";
import Slider from "./pages/find//component/Slider";
import { Toast } from "vant";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Tab,
    Player
  },
  methods: {},
  computed: {
    ...mapState(["isAppending", "fullScreen"]),
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "songUrl"
    ])
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
