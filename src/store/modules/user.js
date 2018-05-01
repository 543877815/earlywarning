const state = {
  username: '',
  id: '',
  email: '',
  isEmailLocked: 0,
  description: '',
  name: '',
  avatar: '',
  roles: [{
    "id": 1,
    "name": "user"
  },
    {
      "id": 2,
      "name": "maintainer"
    },
    {
      "id": 3,
      "name": "admin"
    }
  ]
}

const getters = {
  role: (state) => {
    switch (state.roles[0].id) {
      case 1:
        return '用户';
        break;
      case 2:
        return '维修人员';
        break;
      case 3:
        return '管理员';
        break;
    }
  },
  isEmailLocked: (state) => {
    return state.isEmailLocked === 'LOCKED' ? '未激活' : '已激活';
  }
}

const mutations = {}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
