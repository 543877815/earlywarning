const state = {
  equipTypeActive: {
    name: '所有',
    id: 0
  },
  equipTypes: [],
  equipItems: [],
  equipOnShow: false,
  equipOnShowItem: {},
  equipModelList: []
}

const getters = {
  /**
   * @param cid
   * @return The name of the equipment types whose cid is the same as param
   */
  equipTypeName: (state) => (id) => {
    return state.equipTypes.filter((equipTypes) => equipTypes.id === id)[0].name
  },

  equipTypeLists: (state) => (id) => {
    if (id === 0) {
      return state.equipItems
    } else {
      return state.equipItems.filter((item) => item.id === id)
    }
  }

}

const mutations = {
  changeEquipActive(state, item) {
    state.equipTypeActive = Object.assign({}, item)
  },
  UpdateEquipTypes(state, item) {
    state.equipTypes = item
  },
  UpdateEquipmentItems(state, item) {
    state.equipItems = item
  },
  UpdateEquipOnShow(state, item) {
    state.equipOnShow = item
  },
  maintainStatus(state, status) {
    switch (status) {
      case 0:
        return '等待确认'
      case 1:
        return '等待维修'
      case 2:
        return '正在维修'
      case 3:
        return '维修完成'
    }
  }
}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
