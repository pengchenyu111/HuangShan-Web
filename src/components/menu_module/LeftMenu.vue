<template>
  <el-menu :unique-opened="true" default-active="2" class="el-menu-vertical-demo l-menu" text-color="#0bd077"
           active-text-color="#0bc99d">
    <div class="nav-img">
      <el-image :src="require('../../assets/logo-main.png')" style="width: 200px; margin-top: 10px;"/>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-document"/>
        <span>基础信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-2" @click="setModuleState(MODULE_STATES.MANAGER_MODULE,EDIT_STATUS.STATUS_INITIAL)">管理信息</el-menu-item>
        <el-menu-item index="1-3" @click="setModuleState(MODULE_STATES.TOURIST_MODULE,EDIT_STATUS.STATUS_INITIAL)">游客信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-edit-outline"/>
        <span>客流信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="setModuleState(MODULE_STATES.DAILYNUM_MODULE,EDIT_STATUS.STATUS_INITIAL)">每日客流</el-menu-item>
        <el-menu-item index="2-2" @click="setModuleState(MODULE_STATES.DAILYNUM_PREDICT_MODULE,EDIT_STATUS.STATUS_INITIAL)">客流预测</el-menu-item>
        <el-menu-item index="2-3" @click="setModuleState(MODULE_STATES.HOURLYMANAGE_MODULE,EDIT_STATUS.STATUS_INITIAL)">每时客流</el-menu-item>
        <el-menu-item index="2-4" @click="setModuleState(MODULE_STATES.HOURLYNUM_MODULE,EDIT_STATUS.STATUS_INITIAL)">每时图示</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-coin"/>
        <span>消息信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="setModuleState(MODULE_STATES.NOTIFICATION_MODULE,EDIT_STATUS.STATUS_INITIAL)">通知信息</el-menu-item>
        <el-menu-item index="3-2" @click="setModuleState(MODULE_STATES.SUGGESTION_MODULE,EDIT_STATUS.STATUS_INITIAL)">建议信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location-information"/>
        <span>景点信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="setModuleState(MODULE_STATES.SCENIC_MODULE,EDIT_STATUS.STATUS_INITIAL)">景点信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-office-building"/>
        <span>酒店信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="setModuleState(MODULE_STATES.HOTEL_MODULE,EDIT_STATUS.STATUS_INITIAL)">酒店信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>

import {MODULE_STATES, EDIT_STATUS} from '../../js/constvariable'
export default {
  name: 'LeftMenu',
  data () {
    return {
      MODULE_STATES: MODULE_STATES,
      EDIT_STATUS: EDIT_STATUS
    }
  },
  methods: {
    setModuleState (newState, editIndex, defaultInfo = {}) {
      this.$store.commit('setModuleStatus', newState)
      this.$store.commit('setEditState', editIndex)
      this.$store.commit('setNewFormInfo', {info: defaultInfo})
    }
  }
}

</script>

<style scoped>
  .l-menu {
    height: calc(100vh - 70px);
    font-weight: bold;
    border: 0;
  }

</style>
