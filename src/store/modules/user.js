const state = {
  username: '',
  id: '',
  email: '',
  isEmailLocked: 0,
  description: '',
  name: '',
  avatar: '',
  roles: [{
    'id': 1,
    'name': 'user'
  },
  {
    'id': 2,
    'name': 'maintainer'
  },
  {
    'id': 3,
    'name': 'admin'
  }
  ]
}

const getters = {
  role: (state) => {
    switch (state.roles[0].id) {
      case 1:
        return '用户'
      case 2:
        return '维修人员'
      case 3:
        return '管理员'
    }
  },
  isEmailLocked: (state) => {
    return state.isEmailLocked === 0 ? '未激活' : '已激活'
  }
}

const mutations = {
  UpdateUser(state, item){
    state.username = item.username
    state.id = item.id
    state.email = item.email;
    state.isEmailLocked = item.isEmailLocked
    state.name = item.name
    state.description = item.description
    state.roles = item.roles
  },
  UpdateUserAvatar(state, item){
    state.avatar = item
  },
  UpdateUserName(state, item){
    state.name = item
  }
}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
