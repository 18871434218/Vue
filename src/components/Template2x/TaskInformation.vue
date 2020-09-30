/* eslint-disable no-unused-vars */
<template>
  <el-row>
    <el-row>
      <el-form :inline="true" style="width: 650px">
        <el-form-item label="车辆选择">
          <el-select
            filterable
            placeholder="请选择车辆"
            size="mini"
            v-model="selectDeviceId"
            @change="inquireDeviceId"
          >
            <el-option v-for="(item, index) in carIdData" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select
            filterable
            placeholder="请选择状态"
            size="mini"
            :disabled="selectDeviceId == null"
            v-model="selectTaskStatus"
            @change="inquireTaskStatus"
          >
            <el-option v-for="(item, index) in TaskStatus" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="mini"
            @click="clearSelectData"
            :disabled="selectDeviceId == null || selectTaskStatus == null"
          >清空</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table :data="showData" border style="width: 650px">
        <el-table-column label="车辆ID" prop="carId"></el-table-column>
        <el-table-column label="起点" prop="start"></el-table-column>
        <el-table-column label="终点" prop="end"></el-table-column>
        <el-table-column label="任务类型" prop="taskType"></el-table-column>
        <el-table-column label="任务状态" prop="taskStatus"></el-table-column>
        <el-table-column label="当前位置" prop="currentPosition"></el-table-column>
        <el-table-column label="任务时间" prop="taskTime"></el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      showData: [],
      TaskStatus: ['进行中', '已完成', '等待中', '出错'],
      selectTaskStatus: null,
      selectDeviceId: null
    };
  },

  computed: {
    allCarTask: function() {
      return Object.values(this.$store.state.publicData.allMission);
    },

    carIdData: function() {
      return Object.keys(this.$store.state.publicData.allCarIdMission);
    },

    waitTask: function() {
      return Object.values(this.$store.state.publicData.waitMission);
    },

    finishTask: function() {
      return Object.values(this.$store.state.publicData.finishMission);
    },

    errorTask: function() {
      return Object.values(this.$store.state.publicData.errorMission);
    },

    processTask: function() {
      return Object.values(this.$store.state.publicData.finishMission);
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
  destroyed() {},

  methods: {
    inquireDeviceId(val) {
      var inquireIdTask = [];
      for (var item of this.allCarTask) {
        if (val === item.carId) {
          inquireIdTask.push(item);
        }
      }
      this.showData = inquireIdTask;
    },

    inquireTaskStatus(val) {
      switch (val) {
      case '进行中':
        var inquireProcessTaskStatus = [];
        for (const item of this.processTask) {
          if (this.selectDeviceId === item.carId) {
            inquireProcessTaskStatus.push(item);
          }
        }
        this.showData = inquireProcessTaskStatus;
        break;
      case '已完成':
        var inquireFinishTaskStatus = [];
        for (const item of this.finishTask) {
          if (this.selectDeviceId === item.carId) {
            inquireFinishTaskStatus.push(item);
          }
        }
        this.showData = inquireFinishTaskStatus;
        break;
      case '等待中':
        var inquireWaitTaskStatus = [];
        for (const item of this.waitTask) {
          if (this.selectDeviceId === item.carId) {
            inquireWaitTaskStatus.push(item);
          }
        }
        this.showData = inquireWaitTaskStatus;
        break;
      case '出错':
        var inquireErrorTaskStatus = [];
        for (const item of this.errorTask) {
          if (this.selectDeviceId === item.carId) {
            inquireErrorTaskStatus.push(item);
          }
        }
        this.showData = inquireErrorTaskStatus;
        break;
      }
    },

    clearSelectData() {
      this.showData = this.allCarTask;
    }
  }
};
</script>

<style scoped>
</style>
