<template>
  <el-col :span="18">
    <el-row>
      <el-row>
        <el-row>
          <el-col :span="4" class="TaskInf">任务信息</el-col>
        </el-row>
        <el-row class="TaskInfState">
          <el-col :span="4">选择显示任务状态</el-col>
          <el-col :span="6">
            <el-select
              size="mini"
              v-model="choiceStatusLocal"
              :disabled="selectedRoads==null"
              filterable
              placeholder="请选择任务状态"
              @change="pushStatus"
            >
              <el-option
                v-for="(item, index) in taskStatus"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="Task">
        <el-col>
          <el-table
            :data="taskTableData"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            border
            style="width: 100%;"
            height="300"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-scrollbar style="width:100%">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item>
                      <div v-if="choiceStatus==='出错'">
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
                            style="width: 150px;"
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
  </el-col>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // select_cycle: 1, //循环次数
      // selected_roads: null, //选择路网名称
      // road_names_list: [], //路网文件名称数组
      // current_road_data: {}, //当前所选路网文件内容
      choiceStatusLocal: null,
      taskTableDataLocal: [],
      // car_action: ["取货", "放货"],
      // carTarget: ["货架1层", "货架2层", "货架3层", "传送带"],
      // car_direction: ["左方向", "右方向"],

      // tableData: [],

      taskStatus: ['进行中', '规划失败', '已完成', '出错'],

      // mission: {
      //   //更新任务
      //   content: [],
      //   repeat: 1
      // },

      // response_carTask_data: {}, //mqtt返回car数据

      // response_waitTaskShow: {}, //wait
      // response_errorTaskShow: {}, //error
      // response_finishTaskShow: {}, //finish
      // response_processTaskShow: {}, //process

      // taskTableData: [],
      // waitTaskTable: [],
      // errorTaskTable: [],
      // finishTaskTable: [],
      // processTaskTable: [],

      getRowKeys(row) {
        return row.taskId;
      },
      expands: []
    };
  },

  computed: {
    selectedRoads() {
      return this.$store.state.roadData.selectedRoads;
    },

    choiceStatus() {
      return this.$store.state.taskData.choiceStatus;
    },

    waitTaskTable() {
      return this.$store.state.taskData.waitTaskTable;
    },

    errorTaskTable() {
      return this.$store.state.taskData.errorTaskTable;
    },

    finishTaskTable() {
      return this.$store.state.taskData.finishTaskTable;
    },

    processTaskTable() {
      return this.$store.state.taskData.processTaskTable;
    },
    
    taskTableData() {
      return this.$store.state.taskData.taskTableData;
    }
    //   road_places: function() {
    //     let places = this.current_road_data.places;
    //     return places && Array.isArray(places) ? places : [];
    //   },

    //   // 当前路的所有路径,(带坐标)
    //   road_lines: function() {
    //     let lines = this.current_road_data.lines;
    //     return lines && Array.isArray(lines) ? lines : [];
    //   },

    //   // 当前路的所有路径,(带下标)
    //   road_linesIndex: function() {
    //     let index = this.current_road_data.linesIndex;
    //     return index && Array.isArray(index) ? index : [];
    //   }
  },

  watch: {
    choiceStatusLocal(val) {
      this.$store.dispatch('taskData/changeChoiceStatus', val);
    },

    choiceStatus(val) {
      if (val !== this.choiceStatusLocal) {
        this.choiceStatusLocal = val;
      }
    },

    taskTableDataLocal(val) {
      this.$store.dispatch('taskData/changeTaskTableData', val);
    },

    taskTableData(val) {
      if (val !== this.taskTableDataLocal) {
        this.taskTableDataLocal = val;
      }
    }
    // current_road_data: {
    //   handler: function handler(val) {
    //     //数据更新显示到地图
    //     this.dataTo_map(this.$refs.carMap, val.places, val.lines, false);
    //   },
    //   deep: true // handler监听函数，深度监听
    // },

    // response_carTask_data: {
    //   handler: function handle(task) {
    //     for (let key in task) {
    //       let repeat = task[key].mission.repeat;
    //       let content = task[key].mission.content;
    //       let state = task[key].mission.execDetails.state;
    //       let repeatIndex = task[key].mission.execDetails.repeatIndex;
    //       let currentNode = task[key].mission.execDetails.currentNode;
    //       let contentIndex = task[key].mission.execDetails.contentIndex - 1;

    //       let taskType;
    //       // 判断已完成
    //       if (
    //         repeatIndex == repeat &&
    //         currentNode == content[content.length - 1].node
    //       ) {
    //         console.log("finish", repeatIndex, repeat);
    //         taskType = "finish";
    //         task[key].description = "已完成";
    //       }
    //       // 任务进行中
    //       else if (repeatIndex <= repeat && currentNode != "error") {
    //         taskType = "process";
    //         task[key].description = "执行第" + repeatIndex + "次";
    //       } else if (currentNode == "error") {
    //         task[key].description = "任务出错";
    //         taskType = "error";
    //       }

    //       this.updateTaskShow(taskType, key, task[key]);
    //     }
    //   },
    //   deep: true
    // }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    // this.pull_road_names_list();
    // mqtt_client.subscribe(
    //   "testProject/clientSub/baseState",
    //   { qos: 1 },
    //   error => {
    //     if (error) console.log("订阅失败:", error);
    //     else console.log("订阅成功");
    //   }
    // );
    // //receive message then parse mission data
    // mqtt_client.on("message", (topic, payload) => {
    //   if (topic == "testProject/clientSub/baseState") {
    //     this.parse_mission(payload).then(data => {
    //       if (taskId_valid(data.taskId)) {
    //         this.$set(this.response_carTask_data, data.taskId, data);
    //       }
    //       function taskId_valid(id) {
    //         return Boolean(typeof id == "string" && id.length > 0);
    //       }
    //     });
    //   }
    // });
  },

  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // pushTaskIntoTable(status, name) {
    //   let tempTable = [];
    //   for (let key in status) {
    //     tempTable.push({
    //       taskId: status[key].taskId,
    //       carId: status[key].carId,
    //       description: status[key].description,
    //       currentNode: status[key].mission.execDetails.currentNode,
    //       repeat: status[key].mission.repeat,
    //       repeatIndex: status[key].mission.execDetails.repeatIndex,
    //       mission: status[key].mission
    //     });
    //   }
    //   if (status == this.response_processTaskShow) {
    //     this.processTaskTable = tempTable;
    //     if (name == "进行中") {
    //       this.taskTableData = this.processTaskTable;
    //     }
    //   } else if (status == this.response_waitTaskShow) {
    //     this.waitTaskTable = tempTable;
    //     if (name == "规划失败") {
    //       this.taskTableData = this.waitTaskTable;
    //     }
    //   } else if (status == this.response_finishTaskShow) {
    //     this.finishTaskTable = tempTable;
    //     if (name == "已完成") {
    //       this.taskTableData = this.finishTaskTable;
    //     }
    //   } else if (status == this.response_errorTaskShow) {
    //     this.errorTaskTable = tempTable;
    //     if (name == "出错") {
    //       this.taskTableData = this.errorTaskTable;
    //     }
    //   }
    //   // console.log(this.taskTableData);
    // },

    pushStatus() {
      if (this.choiceStatusLocal === '进行中') {
        this.$store.dispatch('taskData/changeTaskTableData', this.processTaskTable);
      } else if (this.choiceStatusLocal === '规划失败') {
        this.$store.dispatch('taskData/changeTaskTableData', this.waitTaskTable);
      } else if (this.choiceStatusLocal === '已完成') {
        this.$store.dispatch('taskData/changeTaskTableData', this.finishTaskTable);
      } else if (this.choiceStatusLocal === '出错') {
        this.$store.dispatch('taskData/changeTaskTableData', this.errorTaskTable);
      }
    }

    // addRow() {
    //   this.tableData.push({
    //     node: null,

    //     todo: {
    //       action: null,
    //       target: null,
    //       direction: null
    //     }
    //   });
    // },

    // deleteRow(index, rows) {
    //   rows.splice(index, 1);
    // },

    // async onSelected_road_change() {
    //   this.pull_road_data_by_name();
    // },
    // on_publish_mission() {
    //   this.mission.content = this.tableData;
    //   this.publish_mission(this.mission);
    //   // this.tableData = [];
    // },

    // // 任务发布
    // async publish_mission(task) {
    //   await validateTask(task);
    //   let url = "/api/optics/mission/publish";
    //   let response = await this.$http.post(url, task);
    //   if (response.status == 200) {
    //     let result = {
    //       taskId: null,
    //       carId: null,
    //       mission: {},
    //       description: ""
    //     };

    //     result.carId = response.data.carId;
    //     result.taskId = response.data.mission.taskId;
    //     result.mission = response.data.mission;

    //     console.log(response.data.mission);
    //     if (!response.data.error) {
    //       result.description = "执行中";
    //       this.updateTaskShow("process", result.taskId, result);
    //     } else {
    //       result.description = "等待";
    //       this.updateTaskShow("wait", result.taskId, result);
    //     }

    //     if (result.carId) {
    //       this.$notify({
    //         title: "成功",
    //         message: "任务已发布：" + result.carId,
    //         type: "success"
    //       });
    //     } else {
    //       this.$notify({
    //         title: "失败",
    //         message: "任务未发布：" + "没有空闲车辆",
    //         type: "warning"
    //       });
    //     }
    //   }

    //   async function validateTask(task) {
    //     if (!$.isPlainObject(task)) {
    //       throw "task not object";
    //     }
    //     if (!Array.isArray(task.content)) {
    //       throw "task.content not array";
    //     }
    //     if (!$.isPlainObject(task.content[0].todo)) {
    //       throw "task.content[0].todo is not Object";
    //     }
    //   }
    // },
    // // 解析mqtt消息，构造页面展示所需数据结构
    // async parse_mission(payload) {
    //   let result = {
    //     taskId: null,
    //     carId: null,
    //     mission: {},
    //     description: ""
    //   };
    //   payload = JSON.parse(payload.toString());
    //   result.taskId = payload.mission.taskId;
    //   result.carId = payload.vehicleInfo[1];
    //   result.mission = payload.mission;
    //   // console.log(payload.mission);

    //   return result;
    // },
    // // 统一更新所有任务map，不做业务逻辑判断
    // async updateTaskShow(type, key, task) {
    //   switch (type) {
    //     case "wait":
    //       this.$set(this.response_waitTaskShow, key, task);
    //       this.$delete(this.response_finishTaskShow, key);
    //       this.$delete(this.response_errorTaskShow, key);
    //       this.$delete(this.response_processTaskShow, key);
    //       break;
    //     case "finish":
    //       this.$set(this.response_finishTaskShow, key, task);
    //       this.$delete(this.response_waitTaskShow, key);
    //       this.$delete(this.response_errorTaskShow, key);
    //       this.$delete(this.response_processTaskShow, key);
    //       break;
    //     case "process":
    //       this.$set(this.response_processTaskShow, key, task);
    //       this.$delete(this.response_waitTaskShow, key);
    //       this.$delete(this.response_errorTaskShow, key);
    //       this.$delete(this.response_finishTaskShow, key);
    //       break;
    //     case "error":
    //       this.$set(this.response_errorTaskShow, key, task);
    //       this.$delete(this.response_waitTaskShow, key);
    //       this.$delete(this.response_processTaskShow, key);
    //       this.$delete(this.response_finishTaskShow, key);
    //       break;
    //   }
    //   this.pushTaskIntoTable(
    //     this.response_waitTaskShow,
    //     this.choiceStatus
    //   );
    //   this.pushTaskIntoTable(
    //     this.response_finishTaskShow,
    //     this.choiceStatus
    //   );
    //   this.pushTaskIntoTable(
    //     this.response_processTaskShow,
    //     this.choiceStatus
    //   );
    //   this.pushTaskIntoTable(
    //     this.response_errorTaskShow,
    //     this.choiceStatus
    //   );
    // },

    // async pull_road_data_by_name() {
    //   // {file: ""}
    //   let name = this.selected_roads;
    //   let url = "/api/agv/fileManager/getRoadData";
    //   let data = { file: name };
    //   this.$http.post(url, data).then(response => {
    //     if (response.status !== 200) {
    //       return alert("获取地图数据失败");
    //     }
    //     this.check_road_data_props(response.data);
    //     this.current_road_data = response.data;
    //     this.manual_dataTo_map();
    //   });
    // },

    // // map组件数据更新渲染
    // dataTo_map(map, places, lines, autozoom) {
    //   map.places = places; //map相当于carMap实例然后map.places、map.lines调用属性
    //   map.lines = lines;
    //   if (autozoom) {
    //     let centor = calcCentor(places);
    //     map.map.getView().setCenter(centor);
    //     map.map.getView().setZoom(2);
    //   }

    //   function calcCentor(places) {
    //     let centor = [0, 0];
    //     places.forEach(val => {
    //       centor[0] += parseFloat(val.xy[0]);
    //       centor[1] += parseFloat(val.xy[1]);
    //     });
    //     centor[0] /= places.length;
    //     centor[1] /= places.length;
    //     return centor;
    //   }
    // },

    // manual_dataTo_map() {
    //   this.dataTo_map(
    //     this.$refs.carMap,
    //     this.road_places,
    //     this.road_lines,
    //     true
    //   );
    // },

    // // 地图文件列表，属性校验
    // async check_road_name_props(content) {
    //   if (!Array.isArray(content))
    //     return console.error("road name list is not array");
    //   content.forEach(val => {
    //     if (typeof val !== "string")
    //       console.error("road name list is not array");
    //   });
    // },

    // // 地图文件数据，属性校验
    // async check_road_data_props(content) {
    //   if ($.isPlainObject(content)) {
    //     let props = ["places", "lines", "linesIndex"];
    //     for (let val of props) {
    //       if (!content.hasOwnProperty(val))
    //         console.error(val, "property is not object");
    //       if (!Array.isArray(content[val]))
    //         console.error(val, "property is not array");
    //     }
    //   }
    // },

    // async pull_road_names_list() {
    //   let url = "api/agv/fileManager/getFileList";
    //   let data = { src: "local", type: "road" };
    //   this.$http.post(url, data).then(response => {
    //     if (response.status !== 200) {
    //       return alert("获取地图文件失败");
    //     }
    //     this.check_road_name_props(response.data);
    //     this.road_names_list = response.data;
    //   });
    // },

    // push_end(row) {
    //   this.mission.content[this.mission.count].node = row.select_end;
    // },

    // push_cycle() {
    //   this.mission.repeat = this.select_cycle;
    // },

    // push_end_action(row) {
    //   this.mission.content[this.mission.count].todo.action =
    //     row.select_end_action;
    // },

    // push_end_direction(row) {
    //   this.mission.content[this.mission.count].todo.direction =
    //     row.select_end_direction;
    // },

    // push_endTarget(row) {
    //   this.mission.content[this.mission.count].todo.target =
    //     row.select_endTarget;
    // }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
  /* margin-left: 15px; */
}
.el-col {
  padding-left: 20px;
}

ul {
  list-style-type: none;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
  margin-bottom: 20px;
}

.Tasksize {
  height: 250px;
  /* width: 808px; */
  background: #cfddeb;
  /*  background-color: white; */
  padding-left: 0px;

  margin-top: -20px;

  /* margin-left: 5px; */
}

.TaskInf {
  margin-top: -40px;
  font-size: 18px;
}

.TaskInfState {
  margin-top: -40px;
  font-size: 16px;
}

.Task {
  margin-top: -25px;
  /* margin-left: -30px; */
}

.el-steps-ss {
  color: #cfddeb;
}
</style>
