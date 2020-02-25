<template>
  <el-container>
    <el-aside width="200px" class="left-menu">
      <left-menu/>
    </el-aside>
    <el-container>
      <el-header height="60px" style="padding: 0">
        <top-banner/>
      </el-header>
      <el-main class="container-main">
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import TopBanner from './menu_module/TopBanner'
import LeftMenu from './menu_module/LeftMenu'

export default {
  name: 'Main',
  components: {
    'top-banner': TopBanner,
    'left-menu': LeftMenu
  }
}
</script>

<style scoped>
.container-main{
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
}
</style>
