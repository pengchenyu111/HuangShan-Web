<template>
  <div :style="backgroundDiv" class="huanying"></div>
</template>

<script>
export default {
  name: 'welcomeModule',
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../assets/huanying.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style scoped>
.huanying{
  width: 100%;
  height: 100%;
}
</style>
