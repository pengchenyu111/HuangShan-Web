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
        <daily-num-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.DAILYNUM_MODULE"/>
        <scenic-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.SCENIC_MODULE"/>
        <hotel-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.HOTEL_MODULE"/>
        <daily-num-predict-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.DAILYNUM_PREDICT_MODULE"/>
        <hourly-num-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.HOURLYNUM_MODULE"/>
        <hourly-num-manage-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.HOURLYMANAGE_MODULE"/>
        <suggestion-module v-if="(this.$store.state.moduleState & 0xFFF0) === this.MODULE_STATES.SUGGESTION_MODULE"/>
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
import DailyNumModule from './DailyNumModule'
import ScenicModule from './ScenicModule'
import HotelModule from './HotelModule'
import DailyNumPredictModule from './DailyNumPredictModule'
import HourlyNumModule from './HourlyNumModule'
import HourlyNumManageModule from './HourlyNumManageModule'
import SuggestionModule from './SuggestionModule'

export default {
  name: 'Main',
  components: {
    SuggestionModule,
    HourlyNumManageModule,
    HourlyNumModule,
    DailyNumPredictModule,
    HotelModule,
    ScenicModule,
    TouristModule,
    'top-banner': TopBanner,
    'left-menu': LeftMenu,
    'manager-module': ManagerModule,
    'notification-module': NotificationModule,
    'daily-num-module': DailyNumModule
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
