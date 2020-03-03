<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">姓名：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.stuName" placeholder="请输入姓名">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">性别：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.stuSex" placeholder="请选择性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">联系方式：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.stuPhoneNum" placeholder="请输入联系方式"/>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">创建时间：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.stuCreateDate" :disabled="true"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <tourist-search @inputFilter="filtering" @inputReset="resett"/>
    <el-card shadow="hover" class="box-card">
      <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="new_student"><i class="el-icon-plus">新增游客</i></el-button>
      </el-col>
    </el-row>
      <el-divider content-position="right">详细信息</el-divider>
      <el-table :data="bleData" class="searchTable">
        <el-table-column
          fixed label="序号"
          align="center">
          <template v-slot="scope">{{scope.$index + 1 + pageSize * (currentPage - 1)}}</template>
        </el-table-column>
        <el-table-column
          label="头像"
          align="center">
          <template v-slot="iconScope">
            <el-avatar :size="45" :src="iconScope.row.headIcon"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="account"
          label="工号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          label="性别"
          align="center">
          <template v-slot="sexScope">
            <el-tag type="primary" v-if="sexScope.row.sex === '男'">男</el-tag>
            <el-tag type="info" v-if="sexScope.row.sex === '女'">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          align="center">
        </el-table-column>
        <el-table-column
          label="出生日期"
          align="center">
          <template v-slot="timeScope">
            <i class="el-icon-time"></i>
            <span class="time-slot">{{timeScope.row.birth}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="200">
          <template v-slot="Proscope">
            <el-button type="primary" size="small" @click="edit_student(Proscope.row)" class="editButton">
              <i class="el-icon-edit">编辑</i>
            </el-button>
            <el-button type="success" size="small" @click="edit_student(Proscope.row)" class="editButton">
              <i class="el-icon-delete">删除</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        class="page-ination"
        :total="this.dataLength">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import TouristSearch from './TouristSearch'
import {functions} from '../../js/function'

export default {
  name: 'ManagerList',
  components: {
    'tourist-search': TouristSearch
  },
  data () {
    return {
      dataLength: 1,
      currentPage: 1,
      pageSize: 6,
      isSearch: false,
      inputName: '',
      tableData: [],
      dialogTitle: '',
      dialogFormVisible: false,
      actionType: '', // 0 新增 1 编辑
      form: {
        stuId: '',
        stuName: '',
        stuPhoneNum: '',
        stuIsUse: '',
        stuCreateDate: '',
        stuSex: ''
      },
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }]
    }
  },
  computed: {
    bleData () {
      if (this.isSearch) {
        let table = this.tableData.filter(data => (data.name.includes(this.inputName)) || data.phone.includes(this.inputName) || data.account.includes(this.inputName))
        this.changePages(table)
        if (table.length > this.pageSize) {
          return table.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)
        }
        return table
      } else {
        this.changePages(this.tableData)
        let table = this.tableData
        if (table.length > this.pageSize) {
          return this.tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)
        }
        return table
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    changePages (table) {
      this.dataLength = table.length
    },
    filtering (name) {
      this.inputName = name
      this.isSearch = true
      this.currentPage = 1
    },
    resett () {
      this.isSearch = false
      this.inputName = ''
      this.currentPage = 1
    },
    getTouristData () {
      this.axios.get('/tourists/all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.tableData.push(response.data.data[i])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    edit_student (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑管理员信息'
      this.actionType = 1
      this.form.stuId = row.stuId
      this.form.stuCreateDate = row.stuCreateDate
      this.form.stuName = row.stuName
      this.form.stuSex = row.stuSex
      this.form.stuPhoneNum = row.stuPhoneNum
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        this.form.stuSex = this.form.stuSex === '男' ? 0 : 1
        this.axios.post('/student/addNewStudent', this.form)
          .then((res) => {
            if (res.data.code === '0000') {
              this.dialogFormVisible = false
              functions.showSuccessMessage('新增学生成功')
              this.getStudentData()
            } else {
              this.dialogFormVisible = false
              functions.showErrorMessage('新增学生失败')
            }
          })
          .catch(function (error) {
            this.dialogFormVisible = false
            functions.showErrorMessage('新增学生失败')
            console.log(error)
          })
      } else if (this.actionType === 1) {
        this.form.stuSex = this.form.stuSex === '男' ? 0 : 1
        this.axios.post('/student/editStudent', this.form)
          .then((res) => {
            if (res.data.code === '0000') {
              this.dialogFormVisible = false
              functions.showSuccessMessage('编辑学生信息成功')
              this.getStudentData()
            } else {
              this.dialogFormVisible = false
              functions.showErrorMessage('编辑学生信息失败')
            }
          })
          .catch(function (error) {
            this.dialogFormVisible = false
            functions.showErrorMessage('编辑学生信息失败')
            console.log(error)
          })
      }
    },
    new_student () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增学生信息'
      this.actionType = 0
      this.form.stuCreateDate = functions.getNowTime()
    },
    changeIsUse (row) {
      let param = {
        stuId: row.stuId
      }
      this.axios.post('/student/changeStudentStatus', param)
        .then((res) => {
          if (res.data.code === '0000') {
            functions.showSuccessMessage('成功')
          } else {
            functions.showErrorMessage('失败')
          }
        })
        .catch(function (error) {
          functions.showErrorMessage('失败')
          console.log(error)
        })
    }
  },
  watch: {
    dialogFormVisible: function () {
      if (!this.dialogFormVisible) {
        // form 还原
        this.form.stuId = ''
        this.form.stuName = ''
        this.form.stuPhoneNum = ''
        this.form.stuIsUse = ''
        this.form.stuCreateDate = ''
        this.form.stuSex = ''
      }
    }
  },
  created () {
    this.getTouristData()
  }
}
</script>

<style scoped>
  .searchTable{
    margin: 0 auto;
  }
  .page-ination{
    position: absolute;
    width: 500px;
    bottom: 10px;
    left: 50%;
    margin-left: -250px;
  }
  .box-card{
    margin-top: 2vh;
    height: calc(92vh - 150px);
    position: relative;
  }
  .add-dialog-row{
    margin-bottom: 20px;
  }
  .time-slot{
    margin-left: 5px;
  }
</style>
