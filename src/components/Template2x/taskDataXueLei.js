const state = () => ({
    choiceStatus: null,   // 任务状态
  
    tableData: [],
  
    waitTaskTable: [],
    errorTaskTable: [],
    finishTaskTable: [],
    processTaskTable: [],
  
    taskTableData: []
  });
  
  // getters
  const getters = {
    getChoiceStatus: (state) => {
      return state.choiceStatus;
    },
  

    getWaitTaskTable: (state) => {
      return state.waitTaskTable;
    },
    getErrorTaskTable: (state) => {
      return state.errorTaskTable;
    },
    getFinishTaskTable: (state) => {
      return state.finishTaskTable;
    },
    getProcessTaskTable: (state) => {
      return state.processTaskTable;
    }
  };
  
  // actions
  const actions = {
    changeChoiceStatus({ state, commit }, val) {
      commit('setChoiceStatus', val);
    },
    changeTableData({ state, commit }, val) {
      commit('setTableData', val);
    },


    changeWaitTaskTable({ state, commit }, val) {
      commit('setWaitTaskTable', val);
    },
    changeErrorTaskTable({ state, commit }, val) {
      commit('setErrorTaskTable', val);
    },
    changeFinishTaskTable({ state, commit }, val) {
      commit('setFinishTaskTable', val);
    },
    changeProcessTaskTable({ state, commit }, val) {
      commit('setProcessTaskTable', val);
    },


    changeTaskTableData({ state, commit }, val) {
      commit('setTaskTableData', val);
    }
  };
  
  // mutations
  const mutations = {
    setChoiceStatus(state, val) {
      state.choiceStatus = val;
    },
  
    setTableData(state, val) {
      state.tableData = val;
    },
  
    
    setWaitTaskTable(state, val) {
      state.waitTaskTable = val;
    },
    setErrorTaskTable(state, val) {
      state.errorTaskTable = val;
    },
    setFinishTaskTable(state, val) {
      state.finishTaskTable = val;
    },
    setProcessTaskTable(state, val) {
      state.processTaskTable = val;
    },
  

    setTaskTableData(state, val) {
      state.taskTableData = val;
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };
  