<template>
  <div class="tab">
      <!--router-link 需要加tag=‘div’  -->
      <router-link tag="div" class="tab-item" to="find">
          <div>
              发现
          </div>
      </router-link>
      <router-link tag="div" class="tab-item" to="radio">
          <div>电台</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="mine">
          <div>我的</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="ktv">
          <div>k歌</div>
      </router-link>
      <router-link tag="div" class="tab-item" to="friends">
          <div>云村</div>
      </router-link>
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="stylus" >
.tab
 display flex
 position fixed
 bottom 0
 justify-content center
 align-items center
 height 60px
 width 100%
 background-color pink
 .tab-item
    height 100%
    display flex
    flex 1
    background-color green
    align-items center
    justify-content center

</style>