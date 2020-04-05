<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">编号：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.code" placeholder="请输入编号">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">景区名：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.name" placeholder="请输入景区名">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">经度：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.longitude" placeholder="请输入经度">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">纬度：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.latitude" placeholder="请输入纬度">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">票价：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.ticketPrice" placeholder="请输入票价">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">描述：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="5" placeholder="请输入描述信息" v-model="form.description"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <scenic-search @inputFilter="filtering" @inputReset="resett"/>
    <el-card shadow="hover" class="box-card">
      <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="new_notification"><i class="el-icon-plus">新增景区信息</i></el-button>
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
          prop="code"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="景区名"
          align="center">
        </el-table-column>
        <el-table-column
          label="描述"
          align="center">
          <template v-slot="contentScope">
            <el-popover
              v-if="contentScope.row.description !== null"
              placement="top-start"
              width="280"
              trigger="hover">
              <p style="text-indent: 2em">{{contentScope.row.description}}</p>
              <el-button slot="reference" size="small" type="text" style="text-overflow:ellipsis">{{contentScope.row.description}}</el-button>
            </el-popover>
            <el-tag type="info" v-if="contentScope.row.description === null">无描述</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="ticketPrice"
          label="票价"
          align="center">
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          align="center">
        </el-table-column>
        <el-table-column
          prop="latitude"
          label="纬度"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template v-slot="Proscope">
            <el-button type="primary" size="small" @click="edit_student(Proscope.row)" class="editButton">
              <i class="el-icon-edit">编辑</i>
            </el-button>
            <el-button type="success" size="small" @click="deleteNotification(Proscope.row)" class="editButton">
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
import ScenicSearch from './ScenicSearch'
import {functions} from '../../js/function'

export default {
  name: 'ScenicList',
  components: {
    ScenicSearch
  },
  data () {
    return {
      valueFalse: false,
      dataLength: 1,
      currentPage: 1,
      pageSize: 8,
      isSearch: false,
      inputName: '',
      tableData: [],
      dialogTitle: '',
      dialogFormVisible: false,
      actionType: '', // 0 新增 1 编辑
      form: {
        id: '',
        name: '',
        code: '',
        description: '',
        openTime: '',
        ticketPrice: '',
        isClose: '',
        longitude: '',
        latitude: ''
      }
    }
  },
  computed: {
    bleData () {
      if (this.isSearch) {
        let table = this.tableData.filter(data => (data.code.includes(this.inputName)) || data.name.includes(this.inputName))
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
    deleteNotification (row) {
      this.axios.delete('/scenics/' + row.id)
        .then((response) => {
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getScenicData()
          }
        })
        .catch((error) => {
          console.log(error)
          functions.showErrorMessage('删除失败')
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
    getScenicData () {
      this.axios.get('/scenics/all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.tableData.push(response.data.data[i])
          }
        })
        .catch(() => {
          functions.showErrorMessage('更新查询失败')
        })
    },
    edit_student (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑景区信息'
      this.actionType = 1
      this.form.id = row.id
      this.form.code = row.code
      this.form.name = row.name
      this.form.description = row.description
      this.form.ticketPrice = row.ticketPrice
      this.form.longitude = row.longitude
      this.form.latitude = row.latitude
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        this.axios.post('/scenics', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getScenicData()
            } else {
              functions.showErrorMessage('发布通知失败')
            }
          }).catch(() => {
            functions.showErrorMessage('发布通知失败')
          })
      } else if (this.actionType === 1) {
        this.axios.put('/scenics/' + this.form.id, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getScenicData()
            } else {
              functions.showErrorMessage('编辑通知失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑通知失败')
          })
      }
    },
    new_notification () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增景区信息'
      this.actionType = 0
    },
    changeIsUse (row) {
      let url = '/notifications/closes/' + row.id
      this.axios.put(url)
        .then((res) => {
          if (res.data.code === 800) {
          } else {
            functions.showErrorMessage('改变状态失败')
          }
        })
        .catch(() => {
          functions.showErrorMessage('改变状态失败')
          this.getNotificationData()
        })
    }
  },
  watch: {
    dialogFormVisible: function () {
      if (!this.dialogFormVisible) {
        // form 还原
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
    }
  },
  created () {
    this.getScenicData()
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
