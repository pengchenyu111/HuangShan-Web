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
        <tourist-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.TOURIST_MODULE" />
        <notification-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.NOTIFICATION_MODULE"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import TopBanner from './menu_module/TopBanner'
import LeftMenu from './menu_module/LeftMenu'
import ManagerModule from './ManagerModule'
import {MODULE_STATES} from '../js/constvariable'
import TouristModule from './TouristModule'
import NotificationModule from './NotificationModule'

export default {
  name: 'Main',
  components: {
    TouristModule,
    'top-banner': TopBanner,
    'left-menu': LeftMenu,
    'manager-module': ManagerModule,
    'notification-module': NotificationModule
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
