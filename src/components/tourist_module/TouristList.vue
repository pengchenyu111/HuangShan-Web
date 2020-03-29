<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <div class="item_bock head_p" v-if="actionType === 1">
        <div class="head_img">
          <img :src="form.headIcon"/>
        </div>
        <div class="setting_right" @click.stop="uploadHeadImg">
          <div class="caption">更改头像</div>
        </div>
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
      </div>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">联系方式：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.phone" placeholder="请输入联系方式" maxlength="11">
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
        <el-col :span="4"><div>&nbsp;</div></el-col>
        <el-col :span="2"><div class="dialog-hint">密码：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.password" placeholder="请输入密码" show-password/>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">账号：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.phone" placeholder="与联系方式相同" disabled/>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <div v-if="actionType === 0">
          <el-col :span="3"><div class="dialog-hint">创建时间：</div></el-col>
          <el-col :span="7">
            <el-input v-model="form.stuCreateDate" :disabled="true"/>
          </el-col>
        </div>
        <div v-if="actionType === 1">
          <el-col :span="3"><div class="dialog-hint">游客姓名：</div></el-col>
          <el-col :span="7">
            <el-input v-model="form.name"/>
          </el-col>
        </div>
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
          label="账号"
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
            <el-button type="success" size="small" @click="delete_tourist(Proscope.row)" class="editButton">
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
      img: '',
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
        account: '',
        password: '',
        name: '',
        phone: '',
        birth: '',
        sex: '',
        headIcon: ''
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
        let table = this.tableData.filter(data => (data.name.includes(this.inputName)) || data.account.includes(this.inputName))
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
    uploadHeadImg () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile (e) {
      let $target = e.target || e.srcElement
      this.img = $target.files[0]
      let reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.form.headIcon = res.result
      }
      reader.readAsDataURL(this.img)
      let params = new FormData()
      params.append('file', this.img)
      params.append('account', this.form.account)
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      this.axios.post('http://101.37.173.73:9000/uploadFileByAccount', params, config)
        .then((res) => {
          this.form.headIcon = res.data.fileUri
          functions.showSuccessMessage('已上传未保存头像')
        })
        .catch((error) => {
          console.log(error)
          functions.showSuccessMessage('头像上传失败')
        })
    },
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
      this.form.id = row.id
      this.form.account = row.account
      this.form.password = ''
      this.form.name = row.name
      this.form.phone = row.phone
      this.form.birth = row.birth
      this.form.sex = row.sex
      this.form.headIcon = row.headIcon
    },
    delete_tourist (row) {
      this.axios.delete('tourists/' + row.id)
        .then((response) => {
          console.log(response)
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getTouristData()
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
      console.log(this.form)
      if (this.actionType === 0) {
        console.log(this.form)
        this.axios.post('/tourists', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getTouristData()
            } else {
              functions.showErrorMessage('新增管理员失败')
            }
          }).catch(() => {
            functions.showErrorMessage('新增管理员失败')
          })
      } else if (this.actionType === 1) {
        let params = {
          id: this.form.id,
          account: this.form.account,
          password: this.form.password,
          name: this.form.name,
          phone: this.form.phone,
          birth: this.form.birth,
          sex: this.form.sex,
          headIcon: this.form.headIcon
        }
        console.log(this.form)
        console.log(params)
        this.axios.put('/tourists/' + this.form.id, params)
          .then((res) => {
            if (res.data.code === 800) {
              this.axios.put('/tourists/passwords/' + this.form.id, params)
                .then((result) => {
                  if (result.data.code === 800) {
                    this.dialogFormVisible = false
                    this.getTouristData()
                  } else {
                    functions.showErrorMessage('修改密码失败')
                  }
                })
            } else {
              functions.showErrorMessage('编辑游客信息失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑游客信息失败')
          })
      }
    },
    new_student () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增游客信息'
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
        this.form.id = ''
        this.form.account = ''
        this.form.password = ''
        this.form.name = ''
        this.form.phone = ''
        this.form.birth = ''
        this.form.sex = ''
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
  .item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:94px;
    width: 300px;
    padding:0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }
  .head_p {
    height:132px;
  }
  .head_img{
    height: 90px;
  }
  .head_img img{
    width:90px;
    height:90px;
    border-radius:50px
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    font-size: 26px;
    height: 37px;
  }
</style>
