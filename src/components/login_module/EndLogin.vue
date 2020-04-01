<template>
  <div :style="backgroundDiv" style="height: 100vh">
    <el-card class="login-banner">
      <div slot="header" class="clearfix">
        <span class="welcome_span">欢迎登录</span>
      </div>
      <user-login/>
    </el-card>
  </div>
</template>
<script>
import UserLogin from './UserLogin'

export default {
  name: 'EndLogin',
  components: {UserLogin},
  data () {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('../../assets/back.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .login-banner{
    top: 30vh;
    width: 500px;
    height: 340px;
    position: relative;
    left: 50%;
    margin-left: -250px;
    opacity: 0.9;
  }
  .welcome_span{
    color: #0BD077;
  }

</style>
