<template>
  <div id="app">
    <tab></tab>
    <router-view></router-view>
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
<style>
.app{
  height: 200px;
  width: 200px;
}

</style>
