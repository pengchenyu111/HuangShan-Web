/*
 * 在这里定义你的常量，分类封装进不同对象
 * 并写上注释
 */

/*
 * 对应数据库的status字段
 * status 状态对应
 */
const EDIT_STATUS = {

  // 初始
  STATUS_INITIAL: -1,

  // 增
  STATUS_ADD: -2,

  // 删
  STATUS_DELETE: -3,

  // 查
  STATUS_SEEK: -4,

  // 改
  STATUS_MODIFY: -5
}

// 显示模块的编码
// 用当前显示模块的编码与x,x & 0xFFF0 === 对应编码来判断是否是这个模块
// 你可以在你自己的模块下定义15个状态来，比如0x0001就是你为你自己的请购模块自定义的状态1，0x0002就是你为自定义的状态2
// 然后在mainvue中写上你的模块<your-module v-show="this.$store.state."><your-module>
const MODULE_STATES = {
  // 管理员模块
  MANAGER_MODULE: 0x0000,
  // 游客模块
  TOURIST_MODULE: 0x0010,
  // 通知模块
  NOTIFICATION_MODULE: 0x0020,
  // 每日客流量
  DAILYNUM_MODULE: 0x0030
}

export {
  MODULE_STATES,
  EDIT_STATUS
}
/*
 * 如上面的statusJud模块，在别的地方使用
 *  import { statusJud } from '.../js/constvariable.js'
 * 导入，花括号必须要， 然后使用statusJud.IS_DRAFT就能调用
 * 可以参考function.test.js
 */
