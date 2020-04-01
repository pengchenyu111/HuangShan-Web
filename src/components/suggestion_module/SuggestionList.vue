<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">编号：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.id" :disabled="true"/>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">建议人：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.propounder" disabled>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">联系方式：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.contactWay"/>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">建议时间：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.feedbackTime" :disabled="true"/>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">建议：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="7" v-model="form.suggestion"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <suggestion-search @inputFilter="filtering" @inputReset="resett"/>
    <el-card shadow="hover" class="box-card">
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
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          label="建议"
          width="350"
          align="center">
          <template v-slot="contentScope">
            <el-popover
              placement="top-start"
              width="280"
              trigger="hover">
              <p style="text-indent: 2em">{{contentScope.row.suggestion}}</p>
              <el-button slot="reference" type="text" style="text-overflow:ellipsis">{{contentScope.row.suggestion}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="propounder"
          width="150"
          label="建议人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="contactWay"
          width="150"
          label="联系方式"
          align="center">
        </el-table-column>
        <el-table-column
          label="反馈时间"
          width="200"
          align="center">
          <template v-slot="timeScope">
            <i class="el-icon-time"/>
            <span class="time-slot">{{timeScope.row.feedbackTime}}</span>
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
import SuggestionSearch from './SuggestionSearch'
import {functions} from '../../js/function'

export default {
  name: 'SuggestionList',
  components: {
    'suggestion-search': SuggestionSearch
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
        id: '',
        suggestion: '',
        propounder: '',
        feedbackTime: '',
        contactWay: ''
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
        let table = this.tableData.filter(data => (data.suggestion.includes(this.inputName)) || data.propounder.includes(this.inputName) || data.contactWay.includes(this.inputName))
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
      this.axios.delete('/suggestions/' + row.id)
        .then((response) => {
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getSuggestionData()
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
    getSuggestionData () {
      this.axios.get('/suggestions')
        .then((response) => {
          if (response.data.code === 800) {
            this.tableData = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableData.push(response.data.data[i])
            }
          } else {
            functions.showErrorMessage('更新查询失败')
          }
        })
        .catch(() => {
          functions.showErrorMessage('更新查询失败')
        })
    },
    edit_student (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑建议信息'
      this.actionType = 1
      this.form.id = row.id
      this.form.suggestion = row.suggestion
      this.form.propounder = row.propounder
      this.form.feedbackTime = row.feedbackTime
      this.form.contactWay = row.contactWay
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 1) {
        this.axios.put('/suggestions/' + this.form.id, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getSuggestionData()
            } else {
              functions.showErrorMessage('编辑建议信息失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑建议信息失败')
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
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
    }
  },
  created () {
    this.getSuggestionData()
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
