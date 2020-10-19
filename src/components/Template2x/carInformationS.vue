<template>
  <el-row>
    <el-tabs v-model="selectInformation" class="tab">
      <el-tab-pane label="基本信息" name="basicInformation">
        <el-form>
          <el-form-item label="设备ID：">{{ carId }}</el-form-item>
          <el-form-item label="设备通信状态：">{{ deviceCarCommuncationStatus }}</el-form-item>
          <el-form-item label="设备任务状态：">{{ deviceCarTaskStatus }}</el-form-item>
          <el-form-item label="位置：">{{ deviceX }} {{ deviceY }}</el-form-item>
          <el-form-item label="航向角：">{{ deviceAngle }}</el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="硬件信息" name="hardwareInformation">
        <el-table :data="stateItems" class="table_transparent" :show-header="flag">
          <el-table-column>
            <template slot-scope="scope">
              <img
                v-if="scope.row.stateSrc1 != null"
                :id="scope.row.stateId1"
                :src="scope.row.stateSrc1"
                width="20"
                height="20"
              />
              <span style="font-size:15px;">{{ scope.row.stateName1 }}</span>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <img
                v-if="scope.row.stateSrc2 != null"
                :id="scope.row.stateId2"
                :src="scope.row.stateSrc2"
                height="20"
                width="20"
              />
              <span style="font-size:15px;">{{ scope.row.stateName2 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="系统信息" name="systemInformation">
        <div>系统信息</div>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      flag: false,
      selectInformation: 'basicInformation',
      stateItems: [
        {
          stateId1: 'locationInfoImg',
          stateName1: '位置信息',
          stateSrc1: null,
          stateId2: 'cameraInfoImg',
          stateName2: '相机',
          stateSrc2: null
        },
        {
          stateId1: 'lidarInfoImg',
          stateName1: '激光雷达',
          stateSrc1: null,
          stateId2: 'MMWRInfoImg',
          stateName2: '任务执行',
          stateSrc2: null
        },
        {
          stateId1: 'MMWRInfoImg',
          stateName1: '毫米波雷达',
          stateSrc1: null,
          stateId2: 'controllerInfoImg',
          stateName2: '控制器',
          stateSrc2: null
        },
        {
          stateId1: 'ultrasonicRadarInfoImg',
          stateName1: '超声波雷达',
          stateSrc1: null
        }
      ]
    };
  },

  computed: {
    carId() {
      return this.$store.state.carData.selectedCarId;
    },

    deviceX() {
      return this.$store.state.carData.inputX;
    },

    deviceY() {
      return this.$store.state.carData.inputY;
    },

    deviceAngle() {
      return this.$store.state.carData.inputAg;
    },

    deviceCarCommuncationStatus() {
      return this.$store.state.carData.carCommuncationStatus;
    },

    deviceCarTaskStatus() {
      return this.$store.state.carData.carTaskStatus;
    },

    selectedCarId() {
      return this.$store.state.mapData.selectedCarId;
    },

    carsCanUpdate() {
      return this.$store.state.mapData.carsCanUpdate;
    }
    // stateItems() {
    //   // return this.$store.state.mapData.carsCanUpdate[0].stateItems;
    //   return this.$store.getters['mapData/getSelectCarIdData'].stateItems;
    // }
  },

  watch: {
    selectedCarId(val) {
      for (let i = 0; i < this.carsCanUpdate.length; i++) {
        if (this.carsCanUpdate[i].carId === val) {
          this.stateItems = this.carsCanUpdate[i].stateItems;
        }
      }
    }
  },

  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
};
</script>

<style>
.tab {
  width: 300px;
  height: 300px;
}

.el-form-item {
  margin-bottom: 1px;
}

.table_transparent.el-table--border tr, td {
  border: none !important;
}

.table_transparent.el-table::before {
  height: 0;
}

.table_transparent.el-table,
.table_transparent.el-table__expanded-cell {
  background-color: transparent !important;
}

.table_transparent.el-table th,
.table_transparent.el-table tr {
  border: 0 !important;
  font-weight: normal;
  color: ivory;
  font-size: 18px;
  background-color: transparent !important;
}

.table_transparent.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: transparent !important;
}

.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  position: relative;
}

.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 16px;
  color: #eaecf1;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
</style>
