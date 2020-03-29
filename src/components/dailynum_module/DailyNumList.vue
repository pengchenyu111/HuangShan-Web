<template>
  <div>
    <div class="el1">
      <el-card style="height:100%">
        <div class="abs" id="chart_example_1">
          <el-row>
            <el-col :span="19">
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
            <el-col :span="6">
              <el-button type="primary"><i class="el-icon-plus">新增天气记录</i></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="data-show">
          <el-table :data="tableData.slice(this.pageSize * (this.currentPage - 1), this.pageSize * (this.currentPage - 1) + this.pageSize)" class="searchTable">
            <el-table-column
              label="日期"
              width="120"
              align="center">
              <template v-slot="timeScope">
                <i class="el-icon-time"></i>
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
              label="节日"
              align="center">
              <template v-slot="holiScope">
                <el-tag type="danger" v-if="holiScope.row.holidayName != null">{{holiScope.row.holidayName}}</el-tag>
                <el-tag type="primary" v-if="holiScope.row.holidayName == null">非节日</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              align="center">
              <template v-slot="Proscope">
                <el-button type="primary" icon="el-icon-edit" circle size="small"/>
                <el-button type="info" icon="el-icon-delete" circle size="small"/>
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
    <div>
      <div class="el2">
        <el-card style="height:100%">
          <div class="abs" id="chart_example2"></div>
        </el-card>
      </div>
      <div class="el3">
        <el-card style="height:100%">
          <div class="abs" id="chart_example_3"></div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DailyNumList',
  data () {
    return {
      dataLength: 1,
      currentPage: 1,
      pageSize: 9,
      isSearch: false,
      inputName: '',
      tableData: [],
      form: {
        startDate: '',
        endDate: ''
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
      value2: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    searchData () {
      console.log(this.value2[0])
    },
    getDefaultData () {
      this.axios.get('/daily_nums/limit_all')
        .then((response) => {
          this.tableData = []
          for (let i = 0; i < response.data.data.length; i++) {
            this.tableData.push(response.data.data[i])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
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
    width: 50%;
    height: calc(95vh - 60px);
  }
  .el2 {
    float: left;
    margin-left: 1.5%;
    width: 48%;
    height: 61vh;
  }
  .el3 {
    position:absolute;
    margin-left: 44%;
    margin-top: 63vh;
    float:none;
    width:calc(54% - 210px);
    height: 25vh;
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
</style>
