import { setTimeout } from 'core-js';

const state = () => ({
  mapStatus: {
    places: [],
    lines: [],
    goals: [],
    cars: [
      {
        carId: 'buzhidao',
        where: [115, 22],
        direction: 180,
        current_mission: '在线'
      },
      {
        carId: 'zhidao',
        where: [115.5, 22],
        direction: 180,
        current_mission: '在线'
      }
    ]
  },
  carsCanUpdate: [
    {
      carId: 'buzhidao',
      canUpdate: true,
      carSpeed: null,
      carBattery: '',
      carConnectionStatus: '',
      carSpeedRad: 0,
      carWork: '等待任务',
      stateItems: [
        {
          stateId1: 'locationInfoImg',
          stateName1: '位置信息',
          stateSrc1: require('../assets/img/icon/icon-26.png'),
          stateId2: 'cameraInfoImg',
          stateName2: '相机',
          stateSrc2: require('../assets/img/icon/icon-26.png')
        },
        {
          stateId1: 'lidarInfoImg',
          stateName1: '激光雷达',
          stateSrc1: require('../assets/img/icon/icon-26.png'),
          stateId2: 'MMWRInfoImg',
          stateName2: '任务执行',
          stateSrc2: require('../assets/img/icon/icon-26.png')
        },
        {
          stateId1: 'MMWRInfoImg',
          stateName1: '毫米波雷达',
          stateSrc1: require('../assets/img/icon/icon-26.png'),
          stateId2: 'controllerInfoImg',
          stateName2: '控制器',
          stateSrc2: require('../assets/img/icon/icon-26.png')
        },
        {
          stateId1: 'ultrasonicRadarInfoImg',
          stateName1: '超声波雷达',
          stateSrc1: require('../assets/img/icon/icon-26.png')
        }
      ]
    }
  ],
  movedCar: {
    carId: 'buzhidao',
    where: [115, 22],
    direction: 180,
    current_mission: '在线'
  },
  selectedCarId: null,
  selectedRoads: ''
});

// getters
const getters = {
  hadCar: state => recievedData => {
    const carData = recievedData.vehicleInfo;
    if (carData.length === 0) {
      return 2;
    }
    for (let i = 0; i < state.carsCanUpdate.length; i++) {
      if (state.carsCanUpdate[i].carId === carData[1]) {
        return 1;
      }
    }
    return 0;
  },

  getSelectedCarId: state => {
    return state.selectedCarId;
  },

  // getSelectCarIdData: state => {
  //   let carShowData = null;
  //   for (let i = 0; i < state.carsCanUpdate.length; i++) {
  //     if (state.carsCanUpdate[i].carId === state.selectedCarId) {
  //       carShowData = state.carsCanUpdate[i];
  //       break;
  //     }
  //   }
  //   return carShowData;
  // },

  getWhere: state => id => {
    let where = [];
    for (let i = 0; i < state.mapStatus.cars.length; i++) {
      if (state.mapStatus.cars[i].carId === id) {
        where = state.mapStatus.cars[i].where;
        break;
      }
    }
    return where;
  },

  getDirection: state => id => {
    let dir = null;
    for (let i = 0; i < state.mapStatus.cars.length; i++) {
      if (state.mapStatus.cars[i].carId === id) {
        dir = state.mapStatus.cars[i].direction;
        break;
      }
    }
    return ((90 - dir) / 180) * Math.PI;
  },

  getPlaceLength: state => {
    return state.mapStatus.places.length;
  },

  getLinesLength: state => {
    return state.mapStatus.lines.length;
  },

  getGoalsLength: state => {
    return state.mapStatus.goals.length;
  },

  getCarsLength: state => {
    return state.mapStatus.cars.length;
  }
};

// actions
const actions = {
  addCar({ state, commit }, recievedData) {
    commit('pushCar', recievedData);
  },

  updateCar({ state, commit }, recievedData) {
    commit('updateCar', recievedData);
  },

  changeSelectedCarId({ state, commit }, val) {
    commit('setSelectedCarId', val);
  },

  changeRoads({ state, commit }, roadsData) {
    commit('setSelectedRoads', roadsData.name);
    commit('setPlaces', roadsData.places);
    commit('setLines', roadsData.lines);
  }
};

// mutations
const mutations = {
  pushCar(state, recievedData) {
    const carData = recievedData.vehicleInfo;
    const id = carData[1];
    var temp = '';
    if (recievedData.baseState[0] === 1) {
      temp = {
        carId: id,
        canUpdate: true,
        carSpeed: 0,
        carBattery: recievedData.baseState[1],
        carConnectionStatus: recievedData.baseState[2],
        carSpeedRad: 0,
        carWork: '等待任务',
        stateItems: [
          {
            stateId1: 'locationInfoImg',
            stateName1: '位置信息',
            stateSrc1: require('../assets/img/icon/icon-26.png'),
            stateId2: 'cameraInfoImg',
            stateName2: '相机',
            stateSrc2: require('../assets/img/icon/icon-26.png')
          },
          {
            stateId1: 'lidarInfoImg',
            stateName1: '激光雷达',
            stateSrc1: require('../assets/img/icon/icon-26.png'),
            stateId2: 'MMWRInfoImg',
            stateName2: '任务执行',
            stateSrc2: require('../assets/img/icon/icon-26.png')
          },
          {
            stateId1: 'MMWRInfoImg',
            stateName1: '毫米波雷达',
            stateSrc1: require('../assets/img/icon/icon-26.png'),
            stateId2: 'controllerInfoImg',
            stateName2: '控制器',
            stateSrc2: require('../assets/img/icon/icon-26.png')
          },
          {
            stateId1: 'ultrasonicRadarInfoImg',
            stateName1: '超声波雷达',
            stateSrc1: require('../assets/img/icon/icon-26.png')
          }
        ]
      };
    }
    var errors = [];
    for (let i = 1; i < recievedData.errorInfo.length; i++) {
      if (recievedData.errorInfo[i] === 0) {
        errors.push(require('../assets/img/icon/icon-24.png'));
      }
      if (recievedData.errorInfo[i] === 1) {
        errors.push(require('../assets/img/icon/icon-26.png'));
      }
      if (recievedData.errorInfo[i] === 2) {
        errors.push(require('../assets/img/icon/icon-25.png'));
      }
    }
    if (carData[0] === 1) {
      state.mapStatus.cars.push({
        carId: id,
        where: [carData[3], carData[4]],
        direction: carData[5],
        currentStatus: '在线'
      });
      state.movedCar = {
        carId: id,
        where: [carData[3], carData[4]],
        direction: carData[5]
      };
      temp.carSpeed = recievedData.vehicleInfo[6];
      temp.carSpeedRad = recievedData.vehicleInfo[7];
      if (recievedData.vehicleInfo[8] === 0) {
        temp.carWork = '等待任务';
      } else if (recievedData.vehicleInfo[8] === 1) {
        temp.carWork = '任务进行中';
      } else if (recievedData.vehicleInfo[8] === 2) {
        temp.carWork = '绕障中';
      } else if (recievedData.vehicleInfo[8] === 3) {
        temp.carWork = '因障停车';
      } else if (recievedData.vehicleInfo[8] === 4) {
        temp.carWork = '任务完成';
      }
    }

    if (recievedData.errorInfo[0] === 1) {
      temp.stateItems[0].stateSrc1 = errors[0];
      temp.stateItems[0].stateSrc2 = errors[4];
      temp.stateItems[1].stateSrc1 = errors[1];
      temp.stateItems[1].stateSrc2 = errors[5];
      temp.stateItems[2].stateSrc2 = errors[2];
      temp.stateItems[2].stateSrc2 = errors[6];
      temp.stateItems[3].stateSrc1 = errors[3];
    }
    state.carsCanUpdate.push(temp);
  },

  setSelectedCarId(state, val) {
    state.selectedCarId = val;
  },

  updateCar(state, recievedData) {
    var errors = [];
    for (let i = 1; i < recievedData.errorInfo.length; i++) {
      if (recievedData.errorInfo[i] === 0) {
        errors.push(require('../assets/img/icon/icon-24.png'));
      }
      if (recievedData.errorInfo[i] === 1) {
        errors.push(require('../assets/img/icon/icon-26.png'));
      }
      if (recievedData.errorInfo[i] === 2) {
        errors.push(require('../assets/img/icon/icon-25.png'));
      }
    }

    const carData = recievedData.vehicleInfo;
    const id = carData[1];
    let index = null;

    for (let i = 0; i < state.carsCanUpdate.length; i++) {
      if (
        state.carsCanUpdate[i].carId === id &&
        state.carsCanUpdate[i].canUpdate === true
      ) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      if (recievedData.baseState[0] === 1) {
        console.log(index);
        state.carsCanUpdate[index].carBattery = recievedData.baseState[1];
        state.carsCanUpdate[index].carConnectionStatus = recievedData.baseState[2];
      }

      if (recievedData.errorInfo[0] === 1) {
        state.carsCanUpdate[index].stateItems[0].stateSrc1 = errors[0];
        state.carsCanUpdate[index].stateItems[0].stateSrc1 = errors[4];
        state.carsCanUpdate[index].stateItems[1].stateSrc1 = errors[1];
        state.carsCanUpdate[index].stateItems[1].stateSrc1 = errors[5];
        state.carsCanUpdate[index].stateItems[2].stateSrc1 = errors[2];
        state.carsCanUpdate[index].stateItems[2].stateSrc1 = errors[6];
        state.carsCanUpdate[index].stateItems[3].stateSrc1 = errors[3];
      }
    }

    if (carData[0] === 1) {
      for (let i = 0; i < state.mapStatus.cars.length; i++) {
        if (state.mapStatus.cars[i].carId === carData[1]) {
          if (state.selectedCarId === id && index !== null) {
            state.mapStatus.cars[i].where = [carData[3], carData[4]];
            state.mapStatus.cars[i].direction = carData[5];
            if (recievedData[6]) {
              state.mapStatus.cars[i].currentStatus = carData[6];
            }
            state.movedCar = {
              carId: id,
              where: [carData[3], carData[4]],
              direction: carData[5]
            };
            state.carsCanUpdate[index].canUpdate = false;
            setTimeout(function() {
              state.carsCanUpdate[index].canUpdate = true;
            }, 100);
          } else if (state.selectedCarId !== id && index !== null) {
            console.log(index !== null);
            state.mapStatus.cars[i].where = [carData[3], carData[4]];
            state.mapStatus.cars[i].direction = carData[5];
            if (recievedData[6]) {
              state.mapStatus.cars[i].currentStatus = carData[6];
            }
            state.movedCar = {
              carId: id,
              where: [carData[3], carData[4]],
              direction: carData[5]
            };
            state.carsCanUpdate[index].canUpdate = false;
            setTimeout(function() {
              state.carsCanUpdate[index].canUpdate = true;
            }, 3000);
          }
          break;
        }
      }
    }
  },
  setLines(state, lines) {
    state.mapStatus.lines = lines;
  },
  setPlaces(state, places) {
    state.mapStatus.places = places;
  },
  setGoals(state, goals) {
    state.mapStatus.goals = goals;
  },
  setSelectedRoads(state, selectedRoads) {
    state.mapStatus.selectedRoads = selectedRoads;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
