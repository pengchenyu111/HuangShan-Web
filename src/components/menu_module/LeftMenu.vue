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
        <el-menu-item index="1-1">个人信息</el-menu-item>
        <el-menu-item index="1-2">管理信息</el-menu-item>
        <el-menu-item index="1-3">游客信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-edit-outline"/>
        <span>客流信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">每日客流</el-menu-item>
        <el-menu-item index="2-2">每时客流</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-coin"/>
        <span>通知信息</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">通知信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>

export default {
  name: 'LeftMenu',
  data () {
    return {
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
