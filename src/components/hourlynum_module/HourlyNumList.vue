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
        <el-col :span="3"><div class="dialog-hint">6时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['06']" placeholder="请输入6时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">7时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['07']" placeholder="请输入7时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">8时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['08']" placeholder="请输入8时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">9时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['09']" placeholder="请输入9时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">10时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['10']" placeholder="请输入10时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">11时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['11']" placeholder="请输入11时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">12时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['12']" placeholder="请输入12时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">13时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['13']" placeholder="请输入13时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">14时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['14']" placeholder="请输入14时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">15时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['15']" placeholder="请输入15时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">16时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['16']" placeholder="请输入16时客流" type="number">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">17时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['17']" placeholder="请输入17时客流" type="number">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">18时：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form['18']" placeholder="请输入18时客流" type="number">
          </el-input>
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
              <el-button type="primary" @click="addNewData"><i class="el-icon-plus">新增每日每时记录</i></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="data-show">
          <el-table
            :data="tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)"
            class="searchTable">
            <el-table-column
              prop="dateName"
              label="日期"
              width="120"
              align="center">
              <template v-slot="timeScope">
                <i class="el-icon-time"/>
                <span class="time-slot">{{timeScope.row.dateName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="6时"
              align="center">
              <template v-slot="sixScope">
                <el-tag type="danger" v-if="sixScope.row['06'] === null">未统计</el-tag>
                <span v-if="sixScope.row['06'] !== null">{{sixScope.row['06']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="7时"
              align="center">
              <template v-slot="sevenScope">
                <el-tag type="danger" v-if="sevenScope.row['07'] === null">未统计</el-tag>
                <span v-if="sevenScope.row['07'] !== null">{{sevenScope.row['07']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="08"
              label="8时"
              align="center">
              <template v-slot="eightScope">
                <el-tag type="danger" v-if="eightScope.row['08'] === null">未统计</el-tag>
                <span v-if="eightScope.row['08'] !== null">{{eightScope.row['08']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="09"
              label="9时"
              align="center">
              <template v-slot="nineScope">
                <el-tag type="danger" v-if="nineScope.row['09'] === null">未统计</el-tag>
                <span v-if="nineScope.row['09'] !== null">{{nineScope.row['09']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="10"
              label="10时"
              align="center">
              <template v-slot="tenScope">
                <el-tag type="danger" v-if="tenScope.row['10'] === null">未统计</el-tag>
                <span v-if="tenScope.row['10'] !== null">{{tenScope.row['10']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="11"
              label="11时"
              align="center">
              <template v-slot="elevenScope">
                <el-tag type="danger" v-if="elevenScope.row['11'] === null">未统计</el-tag>
                <span v-if="elevenScope.row['11'] !== null">{{elevenScope.row['11']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="12"
              label="12时"
              align="center">
              <template v-slot="twelveScope">
                <el-tag type="danger" v-if="twelveScope.row['12'] === null">未统计</el-tag>
                <span v-if="twelveScope.row['12'] !== null">{{twelveScope.row['12']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="13"
              label="13时"
              align="center">
              <template v-slot="thirteenScope">
                <el-tag type="danger" v-if="thirteenScope.row['13'] === null">未统计</el-tag>
                <span v-if="thirteenScope.row['13'] !== null">{{thirteenScope.row['13']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="14"
              label="14时"
              align="center">
              <template v-slot="fourteenScope">
                <el-tag type="danger" v-if="fourteenScope.row['14'] === null">未统计</el-tag>
                <span v-if="fourteenScope.row['14'] !== null">{{fourteenScope.row['14']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="15"
              label="15时"
              align="center">
              <template v-slot="fifteenScope">
                <el-tag type="danger" v-if="fifteenScope.row['15'] === null">未统计</el-tag>
                <span v-if="fifteenScope.row['15'] !== null">{{fifteenScope.row['15']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="16"
              label="16时"
              align="center">
              <template v-slot="sixteenScope">
                <el-tag type="danger" v-if="sixteenScope.row['16'] === null">未统计</el-tag>
                <span v-if="sixteenScope.row['16'] !== null">{{sixteenScope.row['16']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="17"
              label="17时"
              align="center">
              <template v-slot="seventeenScope">
                <el-tag type="danger" v-if="seventeenScope.row['17'] === null">未统计</el-tag>
                <span v-if="seventeenScope.row['17'] !== null">{{seventeenScope.row['17']}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="18"
              label="18时"
              align="center">
              <template v-slot="eighteenScope">
                <el-tag type="danger" v-if="eighteenScope.row['18'] === null">未统计</el-tag>
                <span v-if="eighteenScope.row['18'] !== null">{{eighteenScope.row['18']}}</span>
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
      dialogTitle: '',
      dialogFormVisible: false,
      actionType: '',
      hours: ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
      form: {
        dateName: '',
        '06': '',
        '07': '',
        '08': '',
        '09': '',
        '10': '',
        '11': '',
        '12': '',
        '13': '',
        '14': '',
        '15': '',
        '16': '',
        '17': '',
        '18': ''
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
      xiangdui: true
    }
  },
  methods: {
    delete_dailyNum (row) {
      this.axios.delete('/hourly_nums/' + row.dateName)
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
    confirm_dialog () {
      if (this.actionType === 0) {
        let array = []
        for (let i = 0; i < this.hours.length; i++) {
          let day = {}
          day['dateName'] = this.form.dateName
          day['hour'] = this.hours[i]
          day['hourNum'] = this.form[this.hours[i]]
          array.push(day)
        }
        this.axios.post('/hourly_nums/many', array)
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
        let array = []
        for (let i = 0; i < this.hours.length; i++) {
          let day = {}
          day['dateName'] = this.form.dateName
          day['hour'] = this.hours[i]
          day['hourNum'] = this.form[this.hours[i]]
          array.push(day)
        }
        this.axios.put('/hourly_nums/' + this.form.dateName, array)
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
      this.dialogTitle = '新增每日每时记录'
      this.actionType = 0
    },
    edit_dailyNum (row) {
      this.dialogFormVisible = true
      this.dialogTitle = '编辑每日每时信息'
      this.actionType = 1
      for (let i = 0; i < this.hours.length; i++) {
        this.form[this.hours[i]] = row[this.hours[i]]
      }
      this.form.dateName = row.dateName
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    searchData () {
      if (this.value2 === '' || this.value2 === null) {
        functions.showErrorMessage('请选择起止日期')
      } else {
        this.axios.get('/hourly_nums/period/start/' + this.value2[0] + '/end/' + this.value2[1])
          .then((response) => {
            console.log(response)
            if (response.data.code === 800) {
              this.tableData = []
              for (let i = 0; i < response.data.data.length;) {
                if (i >= response.data.data.length - 1) {
                  break
                }
                let day = {}
                for (i; i < response.data.data.length - 1; i++) {
                  if (response.data.data[i].dateName === response.data.data[i + 1].dateName) {
                    day['dateName'] = response.data.data[i].dateName
                    day[response.data.data[i].hour] = response.data.data[i].hourNum
                    if (i + 1 === response.data.data.length - 1) {
                      day[response.data.data[i + 1].hour] = response.data.data[i + 1].hourNum
                      for (let j = 0; j < this.hours.length; j++) {
                        if (!day.hasOwnProperty(this.hours[j])) {
                          day[this.hours[j]] = null
                        }
                      }
                      this.tableData.push(day)
                      i++
                      break
                    }
                  } else {
                    day['dateName'] = response.data.data[i].dateName
                    day[response.data.data[i].hour] = response.data.data[i].hourNum
                    for (let j = 0; j < this.hours.length; j++) {
                      if (!day.hasOwnProperty(this.hours[j])) {
                        day[this.hours[j]] = null
                      }
                    }
                    this.tableData.push(day)
                    i++
                    break
                  }
                }
              }
            } else if (response.data.code === 801) {
              this.tableData = []
              functions.showSuccessMessage('查询记录失败')
            }
          })
          .catch((error) => {
            console.log(error)
            functions.showSuccessMessage('查询记录失败')
          })
      }
    },
    getDefaultData () {
      this.axios.get('/hourly_nums/period/start/' + '2019-03-02' + '/end/' + '2023-04-13')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length;) {
            if (i >= response.data.data.length - 1) {
              break
            }
            let day = {}
            for (i; i < response.data.data.length - 1; i++) {
              if (response.data.data[i].dateName === response.data.data[i + 1].dateName) {
                day['dateName'] = response.data.data[i].dateName
                day[response.data.data[i].hour] = response.data.data[i].hourNum
                if (i + 1 === response.data.data.length - 1) {
                  day[response.data.data[i + 1].hour] = response.data.data[i + 1].hourNum
                  for (let j = 0; j < this.hours.length; j++) {
                    if (!day.hasOwnProperty(this.hours[j])) {
                      day[this.hours[j]] = null
                    }
                  }
                  this.tableData.push(day)
                  i++
                  break
                }
              } else {
                day['dateName'] = response.data.data[i].dateName
                day[response.data.data[i].hour] = response.data.data[i].hourNum
                for (let j = 0; j < this.hours.length; j++) {
                  if (!day.hasOwnProperty(this.hours[j])) {
                    day[this.hours[j]] = null
                  }
                }
                this.tableData.push(day)
                i++
                break
              }
            }
          }
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
