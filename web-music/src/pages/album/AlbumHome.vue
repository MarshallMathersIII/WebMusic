<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <album-banner :playlist="playlist" :type="alubmType"></album-banner>
    <!-- 歌曲列表组件 -->
    <song-list
      :playlist="playlist"
      :tracks="tracks"
      :type="type"
      :subscribers="subscribers"
      @moreBtn="moreBtn(arguments)"
      @playingMusic="playingMusic(arguments)"
    ></song-list>
    <!-- 底部弹窗组件 .sync实现 props参数双向绑定 -->
    <bottom-pop :sheetItem="sheetItem" :popup.sync="sheetShow" @toSingerPage="toSingerPage"></bottom-pop>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SongList from "@/components/SongList";
import AlbumBanner from "@/components/AlbumBanner";
import BottomPop from "@/components/BottomPop";
import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar,
    SongList,
    BottomPop,
    AlbumBanner
  },
  data() {
    return {
      milddleTip: "歌单",
      id: "",
      playlist: {},
      defaultImg: 'this.src="' + require("assets/img/lazy_load.png") + '"',
      color: [], //提取背景色
      tracks: [],
      subscribers: [],
      sheetShow: false,
      sheetItem: {
        al: {}
      },
      type: 0,
      alubmType: 1
    };
  },
  mounted() {
    this.id = this.$route.query.id; //专辑id
    console.log(this.id);
    this.getAlbumFn(this.id);
  },
  activated() {
    this.sheetShow = false;
  },
  methods: {
    toSingerPage(singerId) {
      this.$router.push({
        path: "/SingerHome",
        query: { id: singerId }
      });
    },
    getAlbumFn(id) {
      api
        .getAlbumFn(id)
        .then(result => {
          console.log(result.data);
          this.playlist = result.data.album;
          this.tracks = result.data.songs;
          //   this.subscribers = result.data.playlist.subscribers;
        })
        .catch(err => {});
    },
    leftClickBtn() {
      this.$router.back(-1);
    },
    moreBtn(msg) {
      const item = msg[0];
      const index = msg[1];
      this.sheetItem = item;
      console.log(item);
      console.log(this.sheetShow);
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
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlaylist: "SET_PLAYLIST",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setSongUrl: "SET_SONG_URL",
      setSequenceList: "SET_SEQUENCE_LIST"
    })
  },
  computed: {
    ...mapGetters([])
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/styles/variable'
@import '~assets/styles/mixin'
.content
  height 100%
</style>