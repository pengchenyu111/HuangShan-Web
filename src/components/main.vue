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
        <manager-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.MANAGER_MODULE" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import TopBanner from './menu_module/TopBanner'
import LeftMenu from './menu_module/LeftMenu'
import ManagerModule from './ManagerModule'
import {MODULE_STATES} from '../js/constvariable'

export default {
  name: 'Main',
  components: {
    'top-banner': TopBanner,
    'left-menu': LeftMenu,
    'manager-module': ManagerModule
  },
  data () {
    return {
      MODULE_STATES: MODULE_STATES
    }
  }
}
</script>

<style scoped>
.container-main{
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
}
</style>
