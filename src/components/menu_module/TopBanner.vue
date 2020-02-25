<template>
  <div class="nav-top">
        <el-col :span="1" :offset="21">
          <div>
            <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top: 5px;"/>
          </div>
        </el-col>
        <el-col :span="1">
          <div>
            <el-dropdown :hide-on-click="false" style="margin-top: 20px">
              <span class="el-dropdown-link" st>{{name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
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
      accountImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      name: '管理员'
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
