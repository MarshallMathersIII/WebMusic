<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <div>singer</div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar
  },
  data() {
    return {
      milddleTip: "歌手"
    };
  },
  methods: {
    leftClickBtn() {
      this.$router.back(-1);
    }
  }
};
</script>

<style scoped lang="stylus"></style>