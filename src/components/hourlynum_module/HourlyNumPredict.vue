<template>
  <div>
    <div>
      <el-card class="predict-handle dateSearch">
        <el-row class="search-row">
          <el-col :span="5" :offset="2">
            <el-date-picker
              v-model="value1"
              align="right"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" style="width: 100px" @click="getAllData" icon="el-icon-search">查询</el-button>
          </el-col>
          <el-col :span="8" :offset="1">
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
              :picker-options="pickerOptions2">
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="width: 100px" @click="getAllData2" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="predictShow">
      <el-card style="height: 100%">
        <div id="chart_example_1"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {functions} from '../../js/function'
export default {
  name: 'HourlyNumPredict',
  data () {
    return {
      form: {
        dateName: '',
        weatherName: '',
        holidayName: '',
        holidayOrder: ''
      },
      xiangdui: true,
      tableData: [],
      value1: '',
      value2: '',
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      pickerOptions2: {
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
      }
    }
  },
  methods: {
    getDefaultData () {
      this.axios.get('/hourly_nums/2019-04-05')
        .then((response) => {
          if (response.data.code === 800) {
            this.tableData = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableData.push(response.data.data[i])
            }
            this.initPredictShow()
          } else if (response.data.code === 801) {
            this.tableData = []
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAllData () {
      if (this.value1 === '' || this.value1 === null) {
        functions.showErrorMessage('请选择日期')
      } else {
        this.axios.get('/hourly_nums/' + this.value1)
          .then((response) => {
            this.tableData = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableData.push(response.data.data[i])
            }
            this.initPredictShow()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    getAllData2 () {
      if (this.value2 === '' || this.value2 === null) {
        functions.showErrorMessage('请选择起止日期')
      } else {
        this.axios.get('/hourly_nums/period/start/' + this.value2[0] + '/end/' + this.value2[1])
          .then((response) => {
            this.tableData = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableData.push(response.data.data[i])
            }
            this.initPredictShow()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    initPredictShow () {
      let myChart1 = this.$echarts.init(document.getElementById('chart_example_1'))
      // Generate data
      let category = []
      let lineData = []
      let barData = []

      for (let i = 0; i < this.tableData.length; i++) {
        category.push(this.tableData[i].hour)
        barData.push(this.tableData[i].hourNum)
        lineData.push(this.tableData[i].hourNum)
      }

      let option = {
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['line', 'bar'],
          textStyle: {
            color: '#ccc'
          }
        },
        title: {
          left: 'left',
          text: '每日开放时客流量统计'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [{
          name: '实际客流量',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 10,
          itemStyle: {
            color: '#43eec6'
          },
          data: lineData
        }, {
          name: '实际客流量',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#14c8d4'},
                {offset: 1, color: '#43eec6'}
              ]
            )
          },
          data: barData
        }, {
          name: '实际客流量',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: 'rgba(20,200,212,0.5)'},
                {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                {offset: 1, color: 'rgba(20,200,212,0)'}
              ]
            )
          },
          z: -12,
          data: lineData
        }, {
          name: '实际客流量',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f'
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }]
      }
      myChart1.setOption(option)
    }
  },
  mounted () {
    this.getDefaultData()
  }
}
</script>

<style scoped>
  #chart_example_1{
    height: calc(90vh - 150px);
  }
  .predict-handle{
    height: 90px;
  }
  .search-row{
    margin-top: 5px;
  }
  .predictShow{
    margin-top: 2vh;
    height: calc(93vh - 150px);
  }
</style>
