<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">酒店名称：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.hotelName" placeholder="请输入酒店名称">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="2" :offset="1"><div class="dialog-hint">星级：</div></el-col>
        <el-col :span="7">
          <el-rate
            v-model="form.hotelStar"
            :colors="colors">
          </el-rate>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">入住时间：</div></el-col>
        <el-col :span="7">
          <el-time-select
            v-model="form.hotelCheckIn"
            :picker-options="{start: '08:30', step: '00:15', end: '23:30'}"
            placeholder="选择时间">
          </el-time-select>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">离开时间：</div></el-col>
        <el-col :span="7">
          <el-time-select
            v-model="form.hotelLeave"
            :picker-options="{start: '08:30', step: '00:15', end: '23:30'}"
            placeholder="选择时间">
          </el-time-select>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">早餐类型：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.breakfastType" placeholder="请选择类型">
            <el-option
              v-for="item in breakfastOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">早餐价格：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.breakfastPrice" placeholder="请输入早餐价格" number>
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">联系方式：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.hotelPhone" placeholder="请输入联系方式">
          </el-input>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">位置：</div></el-col>
        <el-col :span="7">
          <el-input v-model="form.hotelLocation" placeholder="请输入位置">
          </el-input>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">可携宠物：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.isTakePet" placeholder="请选择类型">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3"><div>&nbsp;</div></el-col>
        <el-col :span="3"><div class="dialog-hint">含停车场：</div></el-col>
        <el-col :span="7">
          <el-select v-model="form.isHavePark" placeholder="请选择类型">
            <el-option
              v-for="item in boolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="add-dialog-row">
        <el-col :span="3"><div class="dialog-hint">描述：</div></el-col>
        <el-col :span="20">
          <el-input type="textarea" rows="7" v-model="form.hotelInstruction"/>
        </el-col>
      </el-row>
      <div class="dialog-footer">
        <el-button @click="cancel_dialog">取 消</el-button>
        <el-button type="primary" @click="confirm_dialog">确 定</el-button>
      </div>
    </el-dialog>
    <hotel-search @inputFilter="filtering" @inputReset="resett"/>
    <el-card shadow="hover" class="box-card">
      <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="new_notification"><i class="el-icon-plus">新增酒店信息</i></el-button>
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
          prop="hotelName"
          width="160"
          label="酒店名称"
          align="center">
        </el-table-column>
        <el-table-column
          label="星级"
          width="140"
          align="center">
          <template v-slot="starScope">
            <el-rate
              v-model="starScope.row.hotelStar"
              disabled
              :colors="colors"
              text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          label="位置"
          align="center">
          <template v-slot="locationScope">
            <el-popover
              placement="top-start"
              width="280"
              trigger="hover">
              <p style="text-indent: 2em">{{locationScope.row.hotelLocation}}</p>
              <el-button slot="reference" size="small" type="text" style="text-overflow:ellipsis">{{locationScope.row.hotelLocation}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          width="150"
          align="center">
          <template v-slot="contentScope">
            <el-popover
              width="280"
              placement="top-start"
              trigger="hover">
              <p style="text-indent: 2em">{{contentScope.row.hotelInstruction}}</p>
              <el-button slot="reference" size="small" type="text" style="text-overflow:ellipsis">{{contentScope.row.hotelInstruction}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="最早入住"
          align="center">
          <template v-slot="earlyScope">
            <i class="el-icon-time"></i>
            <span class="time-slot">{{earlyScope.row.hotelCheckIn}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最晚离开"
          align="center">
          <template v-slot="earlyScope">
            <i class="el-icon-time"></i>
            <span class="time-slot">{{earlyScope.row.hotelLeave}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="hotelPhone"
          label="联系方式"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="breakfastType"
          label="早餐类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="breakfastPrice"
          label="早餐价格"
          align="center">
        </el-table-column>
        <el-table-column
          label="可携宠物"
          align="center">
          <template v-slot="petScope">
            <el-tag v-if="petScope.row.isTakePet === '0'" type="warning">否</el-tag>
            <el-tag v-if="petScope.row.isTakePet === '1'" type="info">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="含停车场"
          align="center">
          <template v-slot="parkScope">
            <el-tag v-if="parkScope.row.isHavePark === '0'" type="warning">否</el-tag>
            <el-tag v-if="parkScope.row.isHavePark === '1'" type="info">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          align="center">
          <template v-slot="Proscope">
            <el-button type="primary" size="small" circle @click="edit_student(Proscope.row)" class="editButton">
              <i class="el-icon-edit"/>
            </el-button>
            <el-button type="success" size="small" circle @click="deleteNotification(Proscope.row)" class="editButton">
              <i class="el-icon-delete"/>
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
import {functions} from '../../js/function'
import HotelSearch from './HotelSearch'
export default {
  name: 'HotelList',
  components: {
    'hotel-search': HotelSearch
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
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      form: {
        id: '',
        hotelName: '',
        hotelStar: '',
        hotelInstruction: '',
        hotelLocation: '',
        hotelCheckIn: '',
        hotelLeave: '',
        hotelPhone: '',
        breakfastType: '',
        breakfastPrice: '',
        isTakePet: '',
        isHavePark: '',
        headIcon: ''
      },
      breakfastOptions: [{
        value: '自助餐',
        label: '自助餐'
      }, {
        value: '中式',
        label: '中式'
      }, {
        value: '西式',
        label: '西式'
      }, {
        value: '不提供',
        label: '不提供'
      }],
      boolOptions: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }]
    }
  },
  computed: {
    bleData () {
      if (this.isSearch) {
        let table = this.tableData.filter(data => (data.hotelName.includes(this.inputName)) || data.hotelPhone.includes(this.inputName))
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
      this.axios.delete('/hotels/' + row.id)
        .then((response) => {
          if (response.data.code !== 800) {
            functions.showErrorMessage('删除失败')
          } else {
            this.getHotelData()
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
    getHotelData () {
      this.axios.get('/hotels')
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
      this.dialogTitle = '编辑通知信息'
      this.actionType = 1
      this.form.id = row.id
      this.form.hotelName = row.hotelName
      this.form.hotelStar = row.hotelStar
      this.form.hotelInstruction = row.hotelInstruction
      this.form.hotelLocation = row.hotelLocation
      this.form.hotelCheckIn = row.hotelCheckIn
      this.form.hotelLeave = row.hotelLeave
      this.form.hotelPhone = row.hotelPhone
      this.form.breakfastType = row.breakfastType
      this.form.breakfastPrice = row.breakfastPrice
      this.form.isTakePet = row.isTakePet
      this.form.isHavePark = row.isHavePark
      this.form.headIcon = row.headIcon
    },
    cancel_dialog () {
      this.dialogFormVisible = false
    },
    confirm_dialog () {
      if (this.actionType === 0) {
        this.axios.post('/hotels', this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getHotelData()
            } else {
              functions.showErrorMessage('新增酒店失败')
            }
          }).catch(() => {
            functions.showErrorMessage('新增酒店失败')
          })
      } else if (this.actionType === 1) {
        this.axios.put('/hotels/' + this.form.id, this.form)
          .then((res) => {
            if (res.data.code === 800) {
              this.dialogFormVisible = false
              this.getHotelData()
            } else {
              functions.showErrorMessage('编辑酒店失败')
            }
          }).catch(() => {
            functions.showErrorMessage('编辑酒店失败')
          })
      }
    },
    new_notification () {
      this.dialogFormVisible = true
      this.dialogTitle = '新增酒店信息'
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
        this.form.hotelStar = 0
      }
    }
  },
  created () {
    this.getHotelData()
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
