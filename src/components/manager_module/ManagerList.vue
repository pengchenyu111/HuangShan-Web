<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="el_dialog">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">姓名：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.name" placeholder="请输入姓名">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">性别：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.sex" placeholder="请选择性别">
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
        <el-col :span="3"><div class="dialog-hint">出生日期：</div></el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="form.birth"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">联系方式：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.phone" placeholder="请输入联系方式"/>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">角色：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"><div>&nbsp;</div></el-col>
        <el-col :span="2"><div class="dialog-hint">工龄：</div></el-col>
        <el-col :span="6">
          <el-input-number v-model="form.workYear" controls-position="right" :min="0" :max="20"/>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">简介：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="7" v-model="form.introduction"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <manager-search @inputFilter="filtering" @inputReset="resett"/>
    <el-card shadow="hover" class="box-card">
      <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="new_manager"><i class="el-icon-plus">新增管理员</i></el-button>
      </el-col>
    </el-row>
      <el-divider content-position="right">详细信息</el-divider>
      <el-table :data="bleData" class="searchTable">
        <el-table-column
          fixed label="序号"
          width="80"
          align="center">
          <template v-slot="scope">{{scope.$index + 1 + pageSize * (currentPage - 1)}}</template>
        </el-table-column>
        <el-table-column
          label="头像"
          width="80"
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
          label="职位"
          align="center">
          <template v-slot="roleScope">
            <el-tag type="primary" effect="dark" v-if="roleScope.row.roleName === '系统管理员'">系统管理员</el-tag>
            <el-tag type="info" effect="dark" v-if="roleScope.row.roleName === '基础数据管理员'">基础数据管理员</el-tag>
            <el-tag type="success" effect="dark" v-if="roleScope.row.roleName === '业务管理员'">业务管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="workYear"
          label="工龄"
          width="50"
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
          label="简介"
          align="center">
          <template v-slot="introScope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover">
              <p style="text-indent: 2em">{{introScope.row.introduction}}</p>
              <el-button slot="reference" type="text" style="text-overflow:ellipsis">{{introScope.row.introduction}}</el-button>
            </el-popover>
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
            <el-button type="success" size="small" @click="delete_student(Proscope.row)" class="editButton" :disabled="Proscope.row.account === myAccount">
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
import ManagerSearch from './ManagerSearch'
import {functions} from '../../js/function'

export default {
  name: 'ManagerList',
  components: {
    'manager-search': ManagerSearch
  },
  data () {
    return {
      myAccount: sessionStorage.getItem('account'),
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
        id: '',
        name: '',
        roleId: '',
        phone: '',
        workYear: 1,
        birth: '',
        sex: '',
        introduction: ''
      },
      sexOptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      roleOptions: [{
        value: '系统管理员',
        label: '系统管理员'
      }, {
        value: '基础数据管理员',
        label: '基础数据管理员'
      }, {
        value: '业务管理员',
        label: '业务管理员'
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
    sortId (a, b) {
      return a.roleId < b.roleId
    },
    getManagerData () {
      this.axios.get('/admins/all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.tableData.push(response.data.data[i])
          }
          this.tableData.sort(this.sortId)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    edit_student (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑管理员信息'
      this.actionType = 1
      this.form.name = row.name
      this.form.roleId = row.roleName
      this.form.phone = row.phone
      this.form.workYear = row.workYear
      this.form.birth = row.birth
      this.form.sex = row.sex
      this.form.introduction = row.introduction
      this.form.id = row.id
    },
    delete_student (row) {
      this.axios.delete('admins/' + row.id)
        .then((response) => {
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getManagerData()
          }
        })
        .catch((error) => {
          console.log(error)
          functions.showErrorMessage('删除失败')
        })
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        if (this.form.roleId === '系统管理员') {
          this.form.roleId = 1
        } else if (this.form.roleId === '基础数据管理员') {
          this.form.roleId = 2
        } else {
          this.form.roleId = 3
        }
        this.axios.post('/admins', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getManagerData()
            } else {
              functions.showErrorMessage('新增管理员失败')
            }
          }).catch(() => {
            functions.showErrorMessage('新增管理员失败')
          })
      } else if (this.actionType === 1) {
        this.form.roleName = this.form.roleId
        console.log(this.form)
        this.axios.put('/admins/part/' + this.form.id, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getManagerData()
            } else {
              functions.showErrorMessage('编辑管理员信息失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑管理员信息失败')
          })
      }
    },
    new_manager () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增管理员信息'
      this.actionType = 0
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
        this.form.name = ''
        this.form.roleId = ''
        this.form.phone = ''
        this.form.workYear = 1
        this.form.birth = ''
        this.form.sex = ''
        this.form.introduction = ''
        this.form.id = ''
      }
    }
  },
  created () {
    this.getManagerData()
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
    margin-bottom: 28px;
  }
  .time-slot{
    margin-left: 5px;
  }
</style>
