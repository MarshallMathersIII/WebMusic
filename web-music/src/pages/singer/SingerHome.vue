<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <singer-info :name="name" :fans="fans" :type="type"></singer-info>
    <div class="tab-wapper">
      <van-tabs v-model="active" swipeable animated>
        <van-tab title="歌曲">
          <!-- 歌曲列表组件 -->
          <song-list
            :playlist="playlist"
            :tracks="tracks"
            :type="type"
            :subscribers="subscribers"
            @moreBtn="moreBtn(arguments)"
            @playingMusic="playingMusic(arguments)"
          ></song-list>
        </van-tab>
        <van-tab title="专辑"></van-tab>
        <van-tab title="主页"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SingerInfo from "@/components/SingerInfo";
import SongList from "@/components/SongList";

import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar,
    SingerInfo,
    SongList
  },
  data() {
    return {
      active: 3,
      playlist: {},
      tracks: [],
      subscribers: [],
      milddleTip: "歌手",
      id: "102019",
      name: "gil scott-heron",
      fans: "20100",
      type: 0,
      bgUrl:
        "http://p1.music.126.net/VRRQf1OR0_I-tGpi2_B6lQ==/109951164656872272.jpg"
    };
  },
  mounted() {
    this.artistSongFn(this.id);
    // this.artistDetailFn(this.id);
  },
  methods: {
    moreBtn(msg) {
      const item = msg[0];
      const index = msg[1];
      this.sheetItem = item;
      console.log(item);
      this.sheetShow = true;
    },
    playingMusic(msg) {
      console.log(msg);
      const item = msg[0];
      const index = msg[1];
      this.getSongUrlFn(item.id);
      this.setPlaylist(this.tracks);
      this.setSequenceList(this.tracks);
      this.setCurrentIndex(index);
      this.setPlayingState(true);
      this.setFullScreen(true);
    },
    getSongUrlFn(id) {
      api
        .getSongUrlFn(id)
        .then(result => {
          console.log(result.data);
          this.setSongUrl(result.data.data[0].url);
        })
        .catch(err => {});
    },
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
          console.log(result.data.songs);
          console.log(result.data.songs);
          this.playlist = result.data;
          this.tracks = result.data.songs;
        })
        .catch(err => {});
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setSongUrl: "SET_SONG_URL",
      setSequenceList: "SET_SEQUENCE_LIST"
    })
  }
};
</script>


<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  .tab-wapper
    height 400px
    position relative
    top 80px
  .tab-wapper>>> .van-tabs__line
    background-color $color-theme
  .tab-wapper>>> .van-ellipsis
    background-color $color-background-grey
  .tab-wapper>>> .van-tab
    background-color $color-background-grey
    title()
</style>