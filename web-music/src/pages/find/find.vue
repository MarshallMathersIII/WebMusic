<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip"></title-bar>
  </div>
</template>
<script>
import TitleBar from "../../components/Titlebar";

export default {
  components: {
    TitleBar
  },
  data() {
    return {
      milddleTip: "发现页面"
    };
  }
};
</script>

<style scoped lang="stylus">
.content
  position fixed
  width 100%
  bottom 60px
  top 0
</style>