<template>
  <el-row class="TaskInf">
    <el-row>
      <el-col :span="5">任务状态选择</el-col>
      <el-col :span="6">
        <el-select
          size="mini"
          v-model="choiceStatus"
          filterable
          placeholder="请选择任务状态"
          @change="exchangeStatus"
        >
          <el-option v-for="(item, index) in taskStatus" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="taskTableData"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          border
          height="300"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-scrollbar style="width: 100%">
                <el-form label-position="left" inline>
                  <el-form-item>
                    <div v-if="choiceStatus === '出错'">
                      <el-steps
                        :active="props.row.mission.execDetails.contentIndex"
                        process-status="error"
                        finish-status="success"
                        align-center
                      >
                        <el-step
                          style="width: 150px;"
                          v-for="(item, i) of props.row.mission.content"
                          :key="i"
                          :description="item.node"
                        ></el-step>
                      </el-steps>
                    </div>
                    <div v-else>
                      <el-steps
                        :active="props.row.mission.execDetails.contentIndex"
                        finish-status="success"
                        align-center
                      >
                        <el-step
                          style="width: 150px"
                          v-for="(item, i) of props.row.mission.content"
                          :key="i"
                          :description="item.node"
                        ></el-step>
                      </el-steps>
                    </div>
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </template>
          </el-table-column>
          <el-table-column label="任务ID" prop="taskId"></el-table-column>
          <el-table-column label="设备ID" prop="carId"></el-table-column>
          <el-table-column label="任务状态" prop="description"></el-table-column>
          <el-table-column label="当前位置" prop="currentNode"></el-table-column>
          <el-table-column label="当前循环数" prop="repeatIndex"></el-table-column>
          <el-table-column label="总循环数" prop="repeat"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      taskStatus: ['进行中', '规划失败', '已完成', '出错'],
      choiceStatus: null,
      getRowKeys(row) {
        return row.task_id;
      },
      expands: []
    };
  },

  computed: {
    taskTableData: {
      get() {
        return this.$store.state.taskDataPlus.allMission;
      },
      set(val) {
        this.$store.state.taskDataPlus.allMission = val;
      }
    },

    processTaskTable() {
      return this.$store.state.taskDataPlus.processMission;
    },

    waitTaskTable() {
      return this.$store.state.taskDataPlus.waitMission;
    },

    finishTaskTable() {
      return this.$store.state.taskDataPlus.finishMission;
    },

    errorTaskTable() {
      return this.$store.state.taskDataPlus.errorMission;
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
    exchangeStatus(val) {
      switch (val) {
      case '进行中':
        this.taskTableData = this.processTaskTable;
        break;
      case '已完成':
        this.taskTableData = this.finishTaskTable;
        break;
      case '规划失败':
        this.taskTableData = this.waitTaskTable;
        break;
      case '出错':
        this.taskTableData = this.errorTaskTable;
        break;
      }
    }
  }
};
</script>

<style scoped>
.el-col {
  padding-bottom: 20px;
}

.el-steps-ss {
  color: #cfddeb;
}

.TaskInf {
  width: 600px;
}
</style>
