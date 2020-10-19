<template>
  <el-row>
    <el-tabs v-model="selectInformation" class="tab">
      <el-tab-pane label="基本信息" name="basicInformation">
        <el-form>
          <el-form-item label="设备ID：">{{ carId }}</el-form-item>
          <el-form-item label="设备通信状态：">{{ deviceCommuncationStatus }}</el-form-item>
          <el-form-item label="设备任务状态：">{{ deviceCommuncationStatus }}</el-form-item>
          <el-form-item label="位置：">{{ deviceX }} {{ deviceY }}</el-form-item>
          <el-form-item label="航向角：">{{ deviceAngle }}</el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="硬件信息" name="hardwareInformation">
        <el-table :data="stateItems" size="mini" class="table_transparent">
          <el-table-column>
            <template slot-scope="scope">
              <img
                v-if="scope.row.stateSrc1 != null"
                :id="scope.row.stateId1"
                :src="scope.row.stateSrc1"
                width="20"
                height="30"
              />
              <span>{{ scope.row.stateName1 }}</span>
            </template>
          </el-table-column>

          <el-table-column>
            <template slot-scope="scope">
              <img
                v-if="scope.row.stateSrc2 != null"
                :id="scope.row.stateId2"
                :src="scope.row.stateSrc2"
                height="20"
                width="30"
              />
              <span>{{ scope.row.stateName2 }}</span>
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
      selectInformation: 'basicInformation'
    };
  },

  computed: {
    currentSelectCarMission() {
      return this.$store.state.taskDataPlus.currentSelectCarMission;
    },

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

    deviceCommuncationStatus() {
      return this.currentSelectCarMission.taskType;
    },

    stateItems() {
      return this.$store.state.taskDataPlus.stateItems;
    }
  },

  watch: {},
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
  margin-bottom: 2px;
}

.table_transparent th {
    border: none;
}

.table_transparent td, .table_transparent th.isleaf {
    border: none;
}

.el-table--border, .el-table--group {
    border: none;
}

.table_transparent thead tr th.is-leaf {
    /* border: 1px solid #EBEEF5;
    border-right: none; */
    border: none;
}

.el-table--border::after, .el-table--group::after {
    border: none;
    width: 0;
}
</style>
