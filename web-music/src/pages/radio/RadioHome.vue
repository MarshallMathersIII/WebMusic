<template>
    <div class="content">
    </div>
</template>
<script>
export default {

};
</script>

<style scoped lang="stylus">
// stylus引入
@import '../../assets/styles/variable'
@import '../../assets/styles/mixin'

.content
    background-color: $color-background
    position: fixed
    width: 100%
    bottom: 60px
    top: 0
    no-wrap()
</style>