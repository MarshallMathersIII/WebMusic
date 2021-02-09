<template>
  <div class="content">
    <title-bar :milddleTip="milddleTip" @leftBtn="leftClickBtn"></title-bar>
    <singer-info :name="name" :fans="fans" :type="type" :bgUrl="bgUrl"></singer-info>
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
        <van-tab title="专辑">
          <album-list :list="hotAlbums" @toListDetail="toListDetail" :albumType="albumType"></album-list>
        </van-tab>
        <van-tab title="主页"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import TitleBar from "@/components/TitleBar";
import SingerInfo from "@/components/SingerInfo";
import SongList from "@/components/SongList";
import AlbumList from "@/components/AlbumList";

import api from "api/api.js";
import ColorThief from "color-thief";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    TitleBar,
    SingerInfo,
    SongList,
    AlbumList
  },
  data() {
    return {
      albumType: 1, //1:专辑；0：歌单
      hotAlbums: [],
      active: 3,
      playlist: {},
      tracks: [],
      subscribers: [],
      milddleTip: "歌手",
      id: "102019",
      name: "",
      fans: 20100,
      type: 0,
      bgUrl: "",
      singerId: 0
    };
  },
  mounted() {
    this.singerId = this.$route.query.id;
    this.artistTopSongFn(this.singerId);
    this.artistAlbumFn(this.singerId);
    // this.artistDetailFn(this.id);
    // this.artistSongsFn(this.id,"hot",20,20)
  },
  methods: {
    //全部歌曲
    artistSongsFn(id, order, limit, offset) {
      api
        .artistAlbumFn(id, order, limit, offset)
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {});
    },
    toListDetail(id) {
      this.$router.push({
        path: "/ListHome",
        query: { id: id }
      });
    },
    artistAlbumFn(id) {
      api
        .artistAlbumFn(id)
        .then(result => {
          console.log(result.data.hotAlbums);
          this.name = result.data.artist.name;
          this.bgUrl = result.data.artist.picUrl;
          this.hotAlbums = result.data.hotAlbums;
        })
        .catch(err => {});
    },
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
    artistTopSongFn(id) {
      api
        .artistTopSongFn(id)
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