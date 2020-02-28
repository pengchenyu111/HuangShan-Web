const mutations = {
  setModuleStatus (state, newState) {
    state.moduleState = newState
  },
  setEditState (state, newIndex) {
    state.editIndex = newIndex
  },
  setNewFormInfo (state, infoTemp) {
    state.infoCache = infoTemp
  }
}
export default mutations
