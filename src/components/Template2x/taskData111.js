const state = () => ({
    allMission: [],
    waitMission: [],
    processMission: [],
    errorMission: [],
    finishMission: [],
    currentSelectCarMission: {}
    // stateItems: [
    //   {
    //     stateId1: 'locationInfoImg',
    //     stateName1: '位置信息',
    //     stateSrc1: require('../assets/img/icon/icon-26.png'),
    //     stateId2: 'cameraInfoImg',
    //     stateName2: '相机',
    //     stateSrc2: require('../assets/img/icon/icon-26.png')
    //   },
    //   {
    //     stateId1: 'lidarInfoImg',
    //     stateName1: '激光雷达',
    //     stateSrc1: require('../assets/img/icon/icon-26.png'),
    //     stateId2: 'MMWRInfoImg',
    //     stateName2: '任务执行',
    //     stateSrc2: require('../assets/img/icon/icon-26.png')
    //   },
    //   {
    //     stateId1: 'MMWRInfoImg',
    //     stateName1: '毫米波雷达',
    //     stateSrc1: require('../assets/img/icon/icon-26.png'),
    //     stateId2: 'controllerInfoImg',
    //     stateName2: '控制器',
    //     stateSrc2: require('../assets/img/icon/icon-26.png')
    //   },
    //   {
    //     stateId1: 'ultrasonicRadarInfoImg',
    //     stateName1: '超声波雷达',
    //     stateSrc1: require('../assets/img/icon/icon-26.png')
    //   }
    // ]
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
    // changeStateItems({ state, commit }, val) {
    //   commit('setStateItems', val);
    // },
    changeCurrentSelectCarMission({ state, commit }, val) {
      commit('setCurrentSelectMission', val);
    }
  };
  
  // mutations
  const mutations = {
    setAllMission(state, val) {
      state.allMission = val;
    },
    setWaitMission(state, val) {
      state.waitMission = val;
    },
    setProcessMission(state, val) {
      state.processMission = val;
    },
    setFinishMission(state, val) {
      state.finishMission = val;
    },
    setErrorMission(state, val) {
      state.errorMission = val;
    },
    // setStateItems(state, val) {
    //   state.stateItems = val;
    // },
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
  