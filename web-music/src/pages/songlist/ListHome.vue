<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" v-on:leftBtn="leftClickBtn"></title-bar>
    <album-banner :playlist="playlist" :type="albumType"></album-banner>
    <!-- 歌曲列表组件 -->
    <song-list
      :finished="finished"
      :vantLoading.sync="vantLoading"
      :playlist="playlist"
      :tracks="tracks"
      :type="type"
      :subscribers="subscribers"
      @moreBtn="moreBtn(arguments)"
      @playingMusic="playingMusic(arguments)"
    ></song-list>
    <!-- 底部弹窗组件 .sync实现 props参数双向绑定 -->
    <bottom-pop
      :sheetItem="sheetItem"
      :popup.sync="sheetShow"
      @toSingerPage="toSingerPage"
      @toAlbumPage="toAlbumPage"
    ></bottom-pop>
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
      vantLoading: false,
      finished: true,
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
      type: 1,
      albumType: 0
    };
  },
  mounted() {
    this.id = this.$route.query.id; //歌单id
    console.log(this.id);
    this.playlistDetailFn(this.id);
  },
  activated() {
    this.sheetShow = false;
  },
  methods: {
    toAlbumPage(albumId) {
      console.log(albumId);
      this.$router.push({
        path: "/AlbumHome",
        query: { id: albumId }
      });
    },
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
    getBgColor() {
      console.log("palette");
      var colorThief = new ColorThief();
      this.color = colorThief.getColor(this.$refs.bgImg);
      console.log(colorThief.getPalette(this.$refs.bgImg, 8));
      console.log(colorThief.getColor(this.$refs.bgImg));
    },
    playlistDetailFn(id) {
      api
        .playlistDetailFn(id)
        .then(result => {
          console.log(result.data.playlist);
          this.playlist = result.data.playlist;
          this.tracks = result.data.playlist.tracks;
          this.subscribers = result.data.playlist.subscribers;
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