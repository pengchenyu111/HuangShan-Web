<template>
  <div class="nav-top">
        <el-col :span="1" :offset="21">
          <div>
            <el-avatar :size="50" :src="headIcon" style="margin-top: 5px;"/>
          </div>
        </el-col>
        <el-col :span="1">
          <div>
            <el-dropdown :hide-on-click="false" style="margin-top: 20px">
              <span class="el-dropdown-link">{{name}}<i class="el-icon-arrow-down el-icon--right"/></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
  </div>
</template>

<script>
export default {
  name: 'TopBanner',
  data () {
    return {
      headIcon: sessionStorage.getItem('headIcon'),
      name: sessionStorage.getItem('name')
    }
  }
}
</script>

<style scoped>
.nav-top{
  width: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #0BD077;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
