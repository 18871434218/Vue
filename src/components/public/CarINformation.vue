<template>
  <el-row>
    <el-tabs v-model="selectInformation">
      <el-tab-pane label="基本信息" name="basicInformation">
        <el-form>
          <el-form-item label="设备ID：">{{ carId }}</el-form-item>
          <el-form-item label="设备通信状态：">{{ deviceCommuncationStatus }}</el-form-item>
          <el-form-item label="设备任务状态：">{{ deviceCommuncationStatus }}</el-form-item>
          <el-form-item label="位置：">x: {{deviceLocation[0]}} y: {{deviceLocation[1]}}</el-form-item>
          <el-form-item label="航向角：">Angle: {{ deviceLocation[2] }}</el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="硬件信息" name="hardwareInformation">
        <div>硬件信息</div>
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
      return this.$store.state.currentSelectCarMission;
    },

    carId() {
      return this.currentSelectCarMission.carId;
    },

    deviceCommuncationStatus() {
      return this.currentSelectCarMission.taskType;
    },

    deviceLocation() {
      return this.currentSelectCarMission.currentPosition;
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

<style scoped>
</style>
