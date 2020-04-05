<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">标题：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.title" placeholder="请输入标题">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">发送人：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.sendAdminName" disabled>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">类型：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">创建时间：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.sendTime" :disabled="true"/>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">内容：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="7" v-model="form.content"/>
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
        <el-button type="primary" @click="new_notification"><i class="el-icon-plus">发布通知信息</i></el-button>
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
          prop="id"
          width="200"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="120"
          align="center">
          <template v-slot="titleScope">
            <el-tooltip placement="top" effect="light">
              <div slot="content">{{titleScope.row.title}}</div>
              <el-tag style="width: 100px; text-overflow:ellipsis; overflow: hidden;">{{titleScope.row.title}}</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="内容"
          width="250"
          align="center">
          <template v-slot="contentScope">
            <el-popover
              placement="top-start"
              width="280"
              trigger="hover">
              <p style="text-indent: 2em">{{contentScope.row.content}}</p>
              <el-button slot="reference" type="text" style="text-overflow:ellipsis">{{contentScope.row.content}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          width="120"
          label="类别"
          align="center">
          <template v-slot="typeScope">
            <el-tag :type="getNotificationTypeColor(typeScope.row.type)" effect="dark">{{getNotificationType(typeScope.row.type)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="sendAdminName"
          label="发送人"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="发送时间"
          align="center">
          <template v-slot="timeScope">
            <i class="el-icon-time"/>
            <span class="time-slot">{{timeScope.row.sendTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="90"
          align="center">
          <template v-slot="OpenScope">
            <el-switch
              v-model="OpenScope.row.isClose"
              v-if="OpenScope.row.isClose === 0"
              active-color="#0bd077"
              @change="changeIsUse(OpenScope.row)"
              :active-value="0"
              :inactive-value="1">
            </el-switch>
            <el-switch
              v-model="OpenScope.row.isClose"
              v-if="OpenScope.row.isClose === 1"
              active-color="#0bd077"
              disabled
              @change="changeIsUse(OpenScope.row)"
              :active-value="0"
              :inactive-value="1">
            </el-switch>
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
import TouristSearch from './NotificationSearch'
import {functions} from '../../js/function'

export default {
  name: 'NotificationList',
  components: {
    'tourist-search': TouristSearch
  },
  data () {
    return {
      valueFalse: false,
      dataLength: 1,
      currentPage: 1,
      pageSize: 7,
      isSearch: false,
      inputName: '',
      tableData: [],
      dialogTitle: '',
      dialogFormVisible: false,
      actionType: '', // 0 新增 1 编辑
      form: {
        sendAdminName: '',
        title: '',
        content: '',
        sendTime: '',
        id: '',
        type: '',
        isClose: '0'
      },
      typeOptions: [{
        value: '0',
        label: '紧急通知'
      }, {
        value: '1',
        label: '客流预警'
      }, {
        value: '2',
        label: '天气预警'
      }, {
        value: '3',
        label: '优惠通知'
      }]
    }
  },
  computed: {
    bleData () {
      if (this.isSearch) {
        let table = this.tableData.filter(data => (data.title.includes(this.inputName)) || data.content.includes(this.inputName))
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
      this.axios.delete('notifications/' + row.id)
        .then((response) => {
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getNotificationData()
          }
        })
        .catch((error) => {
          console.log(error)
          functions.showErrorMessage('删除失败')
        })
    },
    getNotificationTypeColor (number) {
      let name = ''
      if (number === '0') {
        name = 'danger'
      } else if (number === '1') {
        name = 'warning'
      } else if (number === '2') {
        name = 'warning'
      } else {
        name = 'success'
      }
      return name
    },
    getNotificationType (number) {
      let name = ''
      if (number === '0') {
        name = '紧急通知'
      } else if (number === '1') {
        name = '客流预警'
      } else if (number === '2') {
        name = '天气预警'
      } else {
        name = '优惠通知'
      }
      return name
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
    getNotificationData () {
      this.axios.get('/notifications/all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].isClose === '1') {
              response.data.data[i].isClose = 1
            } else {
              response.data.data[i].isClose = 0
            }
            this.tableData.push(response.data.data[i])
          }
        })
        .catch(() => {
          functions.showErrorMessage('更新查询失败')
        })
    },
    edit_student (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑通知信息'
      this.actionType = 1
      this.form.title = row.title
      this.form.id = row.id
      this.form.content = row.content
      this.form.sendTime = row.sendTime
      this.form.sendAdminName = row.sendAdminName
      this.form.type = row.type
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        this.axios.post('/notifications/', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getNotificationData()
            } else {
              functions.showErrorMessage('发布通知失败')
            }
          }).catch(() => {
            functions.showErrorMessage('发布通知失败')
          })
      } else if (this.actionType === 1) {
        this.axios.put('/notifications/' + this.form.id, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getNotificationData()
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
      this.dialogTitle = '发布通知信息'
      this.actionType = 0
      this.form.sendAdminName = sessionStorage.getItem('name')
      this.form.sendTime = functions.getNowTime()
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
        this.form.id = ''
        this.form.title = ''
        this.form.content = ''
        this.form.sendAdminName = ''
        this.form.type = ''
        this.form.isClose = ''
        this.form.sendTime = ''
      }
    }
  },
  created () {
    this.getNotificationData()
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
