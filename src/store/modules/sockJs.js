const state = {
  socketUrl: 'http://localhost:8080/api/webSocket',
  socket: {},

  stompClient: {}
}

const getters = {}
const mutations = {
  connect(state, payload) {
    state.socket = new payload.SockJs(state.socketUrl);
    state.stompClient = payload.Stomp.over(state.socket);
    state.stompClient.connect({username: payload.username}, connectCallback, errorCallback);
  },

  connectCallback(frame) {
    state.stompClient.subscribe('/user/msg/user', function (message) {
      console.log(JSON.parse(message.body).content);
      return JSON.parse(message.body).content
    })
  },

  errorCallback(error) {
    console.log(error);
  }
}

const action = {}
export default {
  state,
  getters,
  mutations,
  action
}
