const state = {
  equipActive: '所有',
  equipTypes: [{
    id: 0,
    name: '所有'
  }],
  equipOnShow: [],
  equipItems: [],
  equipDetailOnShow: null
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
  changeEquipActive(state, item) {
    // console.log(getters.equipTypeLists(item.id));
    // state.equipOnShow = getters.equipTypeLists(item.id);
    state.equipActive = item.name;
  },
}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
