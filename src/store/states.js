const state = {
  moduleState: 0xFFFF, // 模块的状态
  editIndex: -65536, // -1为新建的意思
  saveState: 0,
  submitState: false,
  memberInfo: '',
  avatar: '',
  infoCache: {
    info: {}, // 信息
    flag: '' // 标志
  }
}
export default state
