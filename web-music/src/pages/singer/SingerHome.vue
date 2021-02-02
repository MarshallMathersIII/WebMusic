<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <singer-info :name="name" :fans="fans" :type="type"></singer-info>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SingerInfo from "@/components/SingerInfo";

import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar,
    SingerInfo
  },
  data() {
    return {
      milddleTip: "歌手",
      id: "102019",
      name: "gil scott-heron",
      fans: "20100",
      type:1,
      bgUrl:
        "http://p1.music.126.net/VRRQf1OR0_I-tGpi2_B6lQ==/109951164656872272.jpg"
    };
  },
  mounted() {
    this.artistSongFn(this.id);
    // this.artistDetailFn(this.id);
  },
  methods: {
    leftClickBtn() {
      this.$router.back(-1);
    },
    artistDetailFn(id) {
      api
        .artistDetailFn(id)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    artistSongFn(id) {
      api
        .artistSongFn(id)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    }
  }
};
</script>


<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
</style>