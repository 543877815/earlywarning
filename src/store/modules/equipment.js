const state = {
  equipActive: {
    name: '所有',
    id: 0,
  },
  equipTypes: [],
  equipOnShow: [],
  equipItems: [],
  equipDetailOnShow: null,
  equipModelList:[]
}

const getters = {
  /**
   * @param cid
   * @return The name of the equipment types whose cid is the same as param
   */
  equipTypeName: (state) => (id) => {
    return state.equipTypes.filter((equipTypes) => equipTypes.id === id)[0].name;
  },

  equipTypeLists: (state) => (id) => {
    if (id === 0) {
      return state.equipItems;
    } else {
      return state.equipItems.filter((item) => item.id === id);
    }
  }
}

const mutations = {
  changeEquipActive(state, name) {
    state.equipActive = name;
  },
}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
