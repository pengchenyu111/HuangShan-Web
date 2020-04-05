const mutations = {
  setModuleStatus (state, newState) {
    state.moduleState = newState
  },
  setEditState (state, newIndex) {
    state.editIndex = newIndex
  },
  setNewFormInfo (state, infoTemp) {
    state.infoCache = infoTemp
  },
  setLoginInfo (state, loginInfo) {
    state.memberInfo = loginInfo
  }
}
export default mutations
