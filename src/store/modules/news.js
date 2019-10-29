const state = {
  unReadMsgNum: 10
}

const mutations = {
  UpdateUnReadMsgNum(state, item){
    state.unReadMsgNum = item
  }
}

export default {
  state,
  mutations
}
