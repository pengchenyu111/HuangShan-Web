<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="el_dialog">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">日期：</div></el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="form.dateName"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">天气：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.weatherName" filterable placeholder="请选择天气类型">
            <el-option
              v-for="item in weatherOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">八时客流：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.todayNineNum" placeholder="请输入八时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">九时客流：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.todayEightNum" placeholder="请输入九时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">今日客流：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.todayTotalNum" placeholder="请输入今日客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">预测客流：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.predictNum" placeholder="请输入预测客流" type="number" :disabled="predictInput">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">节日：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.holidayName" filterable placeholder="请选择节日类型" @change="chooseHoliday">
            <el-option
              v-for="item in holidayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">相对天数：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.holidayOrder" placeholder="请输入相对天数" type="number" :disabled="xiangdui">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">订票数：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.orderNum" placeholder="请输入订票数" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">描述：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="3" v-model="form.description"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <div class="el1">
      <el-card style="height:100%">
        <div class="abs" id="chart_example_1">
          <el-row>
            <el-col :span="8" :offset="6">
              <el-date-picker
                v-model="value2"
                type="daterange"
                align="right"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" style="width: 100px" @click="searchData" icon="el-icon-search">查询</el-button>
            </el-col>
          </el-row>
          <el-divider content-position="right">详细信息</el-divider>
          <el-row>
            <el-col :span="3">
              <el-button type="primary" @click="addNewData"><i class="el-icon-plus">新增天气记录</i></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="data-show">
          <el-table
            :data="tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)"
            class="searchTable"
            v-loading="leftDataLoading">
            <el-table-column
              label="日期"
              width="120"
              align="center">
              <template v-slot="timeScope">
                <i class="el-icon-time"/>
                <span class="time-slot">{{timeScope.row.dateName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="dateWeek"
              label="星期"
              align="center">
            </el-table-column>
            <el-table-column
              prop="weatherName"
              label="天气"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="订票数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="todayEightNum"
              label="八时客流"
              align="center">
            </el-table-column>
            <el-table-column
              prop="todayNineNum"
              label="九时客流"
              align="center">
            </el-table-column>
            <el-table-column
              prop="todayTotalNum"
              label="客流量"
              align="center">
            </el-table-column>
            <el-table-column
              prop="predictNum"
              label="预测"
              align="center">
            </el-table-column>
            <el-table-column
              prop="deviationRate"
              label="预测误差"
              align="center">
            </el-table-column>
            <el-table-column
              label="节日"
              align="center">
              <template v-slot="holiScope">
                <el-tag type="danger" v-if="holiScope.row.holidayName != null">{{holiScope.row.holidayName}}</el-tag>
                <el-tag type="primary" v-if="holiScope.row.holidayName == null">非节日</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              align="center">
              <template v-slot="introScope">
                <el-popover
                  v-if="introScope.row.description !== null"
                  placement="top-start"
                  width="250"
                  trigger="hover">
                  <p style="text-indent: 2em">{{introScope.row.description}}</p>
                  <el-button slot="reference" type="text" size="mini" style="text-overflow:ellipsis">{{introScope.row.description}}</el-button>
                </el-popover>
                <el-tag type="info" v-if="introScope.row.description === null">无描述</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120"
              align="center">
              <template v-slot="OptionScope">
                <el-button type="primary" icon="el-icon-edit" circle size="small" @click="edit_dailyNum(OptionScope.row)"/>
                <el-button type="info" icon="el-icon-delete" circle size="small" @click="delete_dailyNum(OptionScope.row)"/>
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
            :total="this.tableData.length">
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {functions} from '../../js/function'
export default {
  name: 'HourlyNumList',
  data () {
    return {
      predictInput: '',
      dataLength: 1,
      currentPage: 1,
      pageSize: 9,
      isSearch: false,
      inputName: '',
      tableData: [],
      leftDataLoading: true,
      dialogTitle: '',
      dialogFormVisible: false,
      actionType: '',
      form: {
        startDate: '',
        endDate: '',
        dateName: '',
        dateWeek: '',
        todayEightNum: '',
        todayNineNum: '',
        todayTotalNum: '',
        orderNum: '',
        weatherName: '',
        moduleName: '',
        description: '',
        isHoliday: '',
        holidayName: '',
        holidayOrder: '',
        predictNum: ''
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: '',
      holidayOptions: [{
        value: '非节日',
        label: '非节日'
      }, {
        value: '国庆节',
        label: '国庆节'
      }, {
        value: '中秋节',
        label: '中秋节'
      }, {
        value: '端午节',
        label: '端午节'
      }, {
        value: '劳动节',
        label: '劳动节'
      }, {
        value: '清明节',
        label: '清明节'
      }, {
        value: '春节',
        label: '春节'
      }, {
        value: '元旦',
        label: '元旦'
      }],
      weatherOptions: [{
        value: '晴',
        label: '晴'
      }, {
        value: '晴间多云',
        label: '晴间多云'
      }, {
        value: '多云',
        label: '多云'
      }, {
        value: '阴',
        label: '阴'
      }, {
        value: '小雨',
        label: '小雨'
      }, {
        value: '中雨',
        label: '中雨'
      }, {
        value: '大雨',
        label: '大雨'
      }, {
        value: '暴雨',
        label: '暴雨'
      }, {
        value: '阵雨',
        label: '阵雨'
      }, {
        value: '雷阵雨',
        label: '雷阵雨'
      }, {
        value: '强阵雨',
        label: '强阵雨'
      }, {
        value: '小雪',
        label: '小雪'
      }, {
        value: '中雪',
        label: '中雪'
      }, {
        value: '大雪',
        label: '大雪'
      }, {
        value: '雨夹雪',
        label: '雨夹雪'
      }, {
        value: '暴雪',
        label: '暴雪'
      }],
      xiangdui: true
    }
  },
  methods: {
    delete_dailyNum (row) {
      this.axios.delete('/daily_nums/' + row.dateName)
        .then((res) => {
          if (res.data.code === 800) {
            this.dialogFormVisible = false
            this.getDefaultData()
          } else {
            functions.showErrorMessage('删除记录失败')
          }
        }).catch(() => {
          functions.showErrorMessage('删除记录失败')
        })
    },
    changeDateWeek (num) {
      if (num === 0) {
        return '星期日'
      } else if (num === 1) {
        return '星期一'
      } else if (num === 2) {
        return '星期二'
      } else if (num === 3) {
        return '星期三'
      } else if (num === 4) {
        return '星期四'
      } else if (num === 5) {
        return '星期五'
      } else if (num === 6) {
        return '星期六'
      }
    },
    chooseHoliday () {
      if (this.form.holidayName !== '非节日') {
        this.xiangdui = false
      } else {
        this.form.holidayOrder = ''
        this.xiangdui = true
      }
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        this.form.dateWeek = this.changeDateWeek(new Date(this.form.dateName).getDay())
        if (this.form.holidayName === '非节日') {
          this.form.holidayName = null
        }
        this.axios.post('/daily_nums', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getDefaultData()
            } else {
              functions.showErrorMessage('新增记录失败')
            }
          }).catch(() => {
            functions.showErrorMessage('新增记录失败')
          })
      } else if (this.actionType === 1) {
        if (this.form.holidayName === '非节日') {
          this.form.holidayName = null
        }
        this.axios.put('/daily_nums/' + this.form.dateName, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getDefaultData()
            } else {
              functions.showErrorMessage('编辑记录失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑记录失败')
          })
      }
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    addNewData () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增天气记录'
      this.actionType = 0
      this.predictInput = true
    },
    edit_dailyNum (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑天气记录'
      this.actionType = 1
      this.form.dateName = row.dateName
      this.form.dateWeek = row.dateWeek
      this.form.todayEightNum = row.todayEightNum
      this.form.todayNineNum = row.todayNineNum
      this.form.todayTotalNum = row.todayTotalNum
      this.form.orderNum = row.orderNum
      this.form.deviationRate = row.deviationRate
      this.form.weatherName = row.weatherName
      this.form.description = row.description
      this.form.holidayName = row.holidayName
      this.form.predictNum = row.predictNum
      this.predictInput = false
      if (this.form.holidayName === null) {
        this.form.holidayName = '非节日'
      }
      this.chooseHoliday()
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    searchData () {
      if (this.value2 === '' || this.value2 === null) {
        functions.showErrorMessage('请选择起止日期')
      } else {
        this.leftDataLoading = true
        this.axios.get('/daily_nums/period/start/' + this.value2[0] + '/end/' + this.value2[1])
          .then((response) => {
            console.log(response)
            if (response.data.code === 800) {
              this.tableData = []
              for (let i = 0; i < response.data.data.length; i++) {
                this.tableData.push(response.data.data[i])
                this.tableData[i].deviationRate = this.tableData[i].deviationRate.toFixed(4)
              }
              this.leftDataLoading = false
            } else if (response.data.code === 801) {
              this.tableData = []
              this.leftDataLoading = false
            }
          })
          .catch((error) => {
            this.leftDataLoading = false
            console.log(error)
          })
      }
    },
    getDefaultData () {
      this.axios.get('/daily_nums/limit_all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.tableData.push(response.data.data[i])
            this.tableData[i].deviationRate = this.tableData[i].deviationRate.toFixed(4)
          }
          this.leftDataLoading = false
        })
        .catch((error) => {
          console.log(error)
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
  mounted () {
    this.getDefaultData()
  }
}
</script>

<style scoped>
  .abs {
    width: 100%;
  }
  .el1 {
    display: block;
    position: relative;
    float: left;
    width: 100%;
    height: calc(95vh - 60px);
  }
  .page-ination{
    position: absolute;
    width: 500px;
    bottom: 10px;
    left: 50%;
    margin-left: -250px;
  }
  .searchTable{
    margin-top: 5px;
  }
  .add-dialog-row{
    margin-bottom: 20px;
  }
</style>
