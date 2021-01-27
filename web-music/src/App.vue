<template>
  <div id="app">
    <tab></tab>
    <!-- TODO keep-alive缓存popup状态，无法关闭-->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player :fullScreen="fullScreen" v-show="playlist.length>0"></player>
    <!-- TODO侧滑栏全局控制 -->
  </div>
</template>

<script>
import Tab from "./pages/base-tab";
import Player from "./pages/player/Player";
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
