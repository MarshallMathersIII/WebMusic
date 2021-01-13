<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
