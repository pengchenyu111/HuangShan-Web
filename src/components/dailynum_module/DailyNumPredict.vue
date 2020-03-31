<template>
  <div>
    <div>
      <el-card class="predict-handle">
        <el-row :gutter="30" class="search-row">
          <el-col :span="4" :offset="1">
            <el-date-picker
              v-model="form.dateName"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-select v-model="form.weatherName" filterable placeholder="请选择天气类型">
              <el-option
                v-for="item in weatherOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-select v-model="form.holidayName" filterable placeholder="请选择节日类型" @change="chooseHoliday">
              <el-option
                v-for="item in holidayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-input v-model="form.holidayOrder" placeholder="请输入相对天数" type="number" :disabled="xiangdui">
            </el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="toPredict" icon="el-icon-search" >预测</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div>
      <el-card class="predict-handle dateSearch">
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
            <el-button type="primary" style="width: 100px" @click="getAllData" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="predictShow">
      <el-card style="height: 100%">
        <div id="chart_example_1"></div>
      </el-card>
    </div>
    <div class="predictDeviationRate">
      <el-card style="height: 100%">
        <div id="chart_example_2"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {functions} from '../../js/function'
export default {
  name: 'DailyNumPredict',
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
      value2: '',
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
      }
    }
  },
  methods: {
    chooseHoliday () {
      if (this.form.holidayName !== '非节日') {
        this.xiangdui = false
      } else {
        this.form.holidayOrder = ''
        this.xiangdui = true
      }
    },
    getDefaultData () {
      this.axios.get('/daily_nums/period/start/2019-03-04' + '/end/2019-04-05')
        .then((response) => {
          if (response.data.code === 800) {
            this.tableData = []
            for (let i = 0; i < response.data.data.length; i++) {
              this.tableData.push(response.data.data[i])
              this.tableData[i].deviationRate = this.tableData[i].deviationRate.toFixed(4)
            }
            this.initPredictShow()
            this.initDeviationRateShow()
          } else if (response.data.code === 801) {
            this.tableData = []
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAllData () {
      if (this.value2 === '' || this.value2 === null) {
        functions.showErrorMessage('请选择起止日期')
      } else {
        this.axios.get('/daily_nums/period/start/' + this.value2[0] + '/end/' + this.value2[1])
          .then((response) => {
            console.log(response)
            if (response.data.code === 800) {
              this.tableData = []
              for (let i = 0; i < response.data.data.length; i++) {
                this.tableData.push(response.data.data[i])
                this.tableData[i].deviationRate = this.tableData[i].deviationRate.toFixed(4)
              }
              this.initPredictShow()
              this.initDeviationRateShow()
            } else if (response.data.code === 801) {
              this.tableData = []
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    toPredict () {
      let JSon = {
        holidayName: this.form.holidayName,
        holidayOrder: this.form.holidayOrder,
        formatDate: this.form.dateName,
        weatherName: this.form.weatherName
      }
      if (JSon.holidayName === '非节日') {
        JSon.holidayName = ''
        JSon.holidayOrder = 0
      }
      this.axios.post('/daily_nums/predict', JSon)
        .then((response) => {
          if (response.data.code === 800) {
            console.log(response)
            JSon.dateName = JSon.formatDate
            JSon.predictNum = response.data.data
            this.tableData.unshift(JSon)
            functions.showSuccessMessage('预测成功 ' + JSon.dateName + ': ' + JSon.predictNum)
            this.initPredictShow()
            this.initDeviationRateShow()
          } else if (response.data.code === 801) {
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.initDeviationRateShow()
    },
    initPredictShow () {
      let myChart1 = this.$echarts.init(document.getElementById('chart_example_1'))
      // Generate data
      let category = []
      let lineData = []
      let barData = []

      for (let i = 0; i < this.tableData.length; i++) {
        category.push(this.tableData[this.tableData.length - i - 1].dateName)
        barData.push(this.tableData[this.tableData.length - i - 1].todayTotalNum)
        lineData.push(this.tableData[this.tableData.length - i - 1].predictNum)
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
          text: '客流量统计与预测'
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
          name: '预测客流量',
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
          name: '预测客流量',
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
          name: '预测客流量',
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
    },
    initDeviationRateShow () {
      let myChart2 = this.$echarts.init(document.getElementById('chart_example_2'))
      let date = []
      let data = []

      for (let i = 0; i < this.tableData.length - 1; i++) {
        date.push(this.tableData[this.tableData.length - i - 1].dateName)
        data.push(this.tableData[this.tableData.length - i - 1].deviationRate)
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'left',
          text: '预测误差率分析',
          color: 'green'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '误差率',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(20, 200, 212)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0bc99d'
              }, {
                offset: 1,
                color: 'rgb(20, 200, 212)'
              }])
            },
            data: data
          }
        ]
      }
      myChart2.setOption(option)
    }
  },
  mounted () {
    this.getDefaultData()
  }
}
</script>

<style scoped>
  .dateSearch{
    margin-top: 2vh;
  }
  #chart_example_1{
    height: calc(38vh - 60px);
  }
  #chart_example_2{
    height: calc(38vh - 60px);
  }
  .predict-handle{
    height: 80px;
  }
  .predictShow{
    margin-top: 2vh;
    height: calc(45vh - 120px);
  }
  .predictDeviationRate{
    margin-top: 2vh;
    height: calc(46vh - 120px);
  }
</style>
