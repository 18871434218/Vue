const state = () => ({
  allMission: [],

  waitTask: [],
  processTask: [],
  errorTask: [],
  finishTask: [],

  currentSelectCarMission: {}
});

// actions
const actions = {
  changeAllMission({ state, commit }, val) {
    commit('setAllMission', val);
  },


  changeWaitMission({ state, commit }, val) {
    commit('setWaitMission', val);
  },
  changeProcessMission({ state, commit }, val) {
    commit('setProcessMission', val);
  },
  chnageFinishMission({ state, commit }, val) {
    commit('setFinishMission', val);
  },
  changeErrorMission({ state, commit }, val) {
    commit('setErrorMission', val);
  },


  changeCurrentSelectCarMission({ state, commit }, val) {
    commit('setCurrentSelectMission', val);
  }
};

// mutations
const mutations = {
  setAllMission(state, val) {
    state.allMission = val;
  },


  setWaitTask(state, val) {
    state.waitTask = val;
  },
  setProcessTask(state, val) {
    state.processTask = val;
  },
  setFinishTask(state, val) {
    state.finishTask = val;
  },
  setErrorTask(state, val) {
    state.errorTask = val;
  },

  
  setCurrentSelectCarMission(state, val) {
    state.currentSelectCarMission = val;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
