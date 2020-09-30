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
            v-model="selectTaskStatus"
            @change="inquireTaskStatus"
          >
            <el-option v-for="(item, index) in TaskStatus" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="mini" @click="clearSelectData">清空</el-button>
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
import mqttClient from '../../library/mqtt';

export default {
  data() {
    return {
      showData: [],
      responseCarTaskData: {},     // mqtt返回car数据
      responseCarIdData: {},
      responseWaitTaskData: {},
      responseErrorTaskData: {},
      responseFinishTaskData: {},
      responseProcessTaskData: {},

      TaskStatus: ['进行中', '已完成', '等待中', '出错'],
      selectTaskStatus: null,
      selectDeviceId: null
    };
  },

  computed: {
    taskData: function() {
      return Object.values(this.responseCarTaskData);
    },

    carIdData: function() {
      return Object.keys(this.responseCarIdData);
    },

    waitTask: function() {
      return Object.values(this.responseWaitTaskData);
    },

    finishTask: function() {
      return Object.values(this.responseFinishTaskData);
    },

    errorTask: function() {
      return Object.values(this.responseErrorTaskData);
    },

    processTask: function() {
      return Object.values(this.responseProcessTaskData);
    }
  },

  watch: {
    responseCarTaskData: {
      handler: function handle(task) {
        for (const key in task) {
          const taskFlag = task[key].taskFlag;
          this.updateTaskShow(taskFlag, key, task[key]);
        }
      },
      deep: true
    }
  },

  beforeCreate() {},
  created() {},
  beforeMount() {},

  mounted() {
    mqttClient.subscribe(
      'testProject/clientSub/baseState',
      { qos: 1 },
      error => {
        if (error) {
          console.log('订阅失败：', error);
        } else {
          console.log('订阅成功');
        }
      }
    );

    mqttClient.on('message', (topic, payload) => {
      if (topic === 'testProject/clientSub/baseState') {
        this.parseMission(payload).then(data => {
          if (taskIdValid(data.task_id)) {
            this.$set(this.responseCarTaskData, data.taskId, data);
            this.$set(this.responseCarIdData, data.carId, data);
          }

          function taskIdValid(id) {
            return Boolean(typeof id === 'string' && id.length > 0);
          }
        });
      }
    });
  },

  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  destroyed() {},

  methods: {
    // 解析mqtt消息，构造页面展示所需数据结构
    async parseMission(payload) {
      const result = {
        taskId: null,
        carId: null,
        start: 0,
        end: 0,
        taskType: '',
        taskStatus: '',
        currentPosition: '',
        taskTime: '',
        taskFlag: ''
      };

      payload = JSON.parse(payload.toString());
      // const repeat = payload.mission.repeat;
      const content = payload.mission.content;
      // const state = payload.mission.execDetails.state;
      // const repeatIndex = payload.mission.execDetails.repeatIndex;
      // const currentNode = payload.mission.execDetails.currentNode;
      // const contentIndex = payload.mission.execDetails.contentIndex - 1;
      const taskId = payload.mission.task_id;
      const carId = payload.vehicleInfo[1];
      const start = payload.mission.content[0].node;
      const end = payload.mission.content[content.length - 1].node;

      result.taskId = taskId;
      result.carId = carId;
      result.start = start;
      result.end = end;
      result.taskFlag = 'finish';

      const type = payload.mission.content.todo.action;
      if (type === 1) {
        result.taskType = '取货';
      } else {
        result.taskType = '放货';
      }

      result.taskStatus = '进行中'; // 任务状态需后台重新定义数据
      result.currentPosition = 'x:122 y:39';
      result.taskTime = '60s';
      return result;
    },

    // 统一更新所有任务map，不做业务逻辑判断
    async updateTaskShow(type, key, task) {
      switch (type) {
      case 'wait':
        this.$set(this.responseWaitTaskData, key, task);
        this.$delete(this.responseFinishTaskData, key);
        this.$delete(this.responseErrorTaskData, key);
        this.$delete(this.responseProcessTaskData, key);
        break;
      case 'finish':
        this.$set(this.responseFinishTaskData, key, task);
        this.$delete(this.responseWaitTaskData, key);
        this.$delete(this.responseErrorTaskShow, key);
        this.$delete(this.responseProcessTaskShow, key);
        break;
      case 'process':
        this.$set(this.responseProcessTaskData, key, task);
        this.$delete(this.responseWaitTaskData, key);
        this.$delete(this.responseErrorTaskData, key);
        this.$delete(this.responseFinishTaskData, key);
        break;
      case 'error':
        this.$set(this.responseErrorTaskData, key, task);
        this.$delete(this.responseWaitTaskData, key);
        this.$delete(this.responseProcessTaskData, key);
        this.$delete(this.responseFinishTaskData, key);
        break;
      }
    },

    inquireDeviceId(val) {
      const attDat = [];
      for (const item of this.responseCarIdData) {
        if (val === item.carId) {
          attDat.push(item);
        }
      }
      this.showData = attDat;
    },

    inquireTaskStatus(val) {
      switch (val) {
      case '进行中':
        this.showData = this.processTask;
        break;
      case '已完成':
        this.showData = this.finishTask;
        break;
      case '等待中':
        this.showData = this.waitTask;
        break;
      case '出错':
        this.showData = this.errorTask;
        break;
      }
    },

    clearSelectData() {
      this.showData = this.taskData;
    }
  }
};
</script>

<style scoped>
</style>
