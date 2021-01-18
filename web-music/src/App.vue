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
export default {
  components: {
    Tab
  },
  methods: {}
};
</script>

<style scoped lang="stylus"></style>
