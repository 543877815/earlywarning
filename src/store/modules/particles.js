const state = {
  show: true
};

const mutations ={
  particlesControl(state, el){
    state.show = !state.show;
    !state.show ? el.style.display = 'none' : el.style.display = 'block';
  }
}

export default  {
  state,
  mutations
}
