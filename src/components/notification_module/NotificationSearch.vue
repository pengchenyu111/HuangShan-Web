<template>
  <div>
    <el-card shadow="hover" class="box-card">
      <el-row :gutter="60" class="search-row">
        <el-col :span="9" :offset="5">
          <el-input v-model="inputName" placeholder="请输入标题 / 内容"/>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="getInput" icon="el-icon-search" >搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="reset" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NotificationSearch',
  methods: {
    getInput () {
      this.$emit('inputFilter', this.inputName)
    },
    reset () {
      this.inputName = ''
      this.$emit('inputReset')
    }
  },
  data () {
    return {
      inputName: ''
    }
  }
}
</script>

<style scoped>
  .search-row{
    margin:5px auto;
  }
</style>
