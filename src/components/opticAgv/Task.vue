<template>
  <el-col :span="23">
    <el-row>
      <el-col :span="13">
        <el-row>
          <carMap ref="carMap" style="height: 556px; width: auto; background-color:#cfddeb ;"></carMap>
        </el-row>
      </el-col>
      <el-col :span="11">
        <el-row>
          <el-col :span="8" style="font-size:22px;">路网信息</el-col>
          <el-col :span="12">
            <el-select
              size="mini"
              v-model="selected_roads"
              filterable
              placeholder="请选择路网"
              @change="on_selected_road_change()"
            >
              <el-option
                v-for="(item, index) in road_names_list"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>

        <div
          style="background:linear-gradient(to right,#000ff5,#00b400);height:1px;margin-top:10px;"
        ></div>

        <el-row>
          <el-col :span="8" style="font-size:18px;">任务发布</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button
              round
              size="mini"
              type="primary"
              @click="addRow()"
              :disabled="selected_roads === null ||  tableData.length >= 1 && (tableData[tableData.length-1].node == null || tableData[tableData.length-1].todo.target == null || tableData[tableData.length-1].todo.direction == null || tableData[tableData.length-1].todo.action == null)"
            >新增任务条目</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%" height="300">
          <el-table-column label="任务节点" width="110">
            <template slot-scope="scope">
              <el-select
                size="mini"
                v-model="scope.row.node"
                :disabled="selected_roads==null"
                filterable
                placeholder="选节点"
              >
                <el-option
                  v-for="(item, index) in road_places"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="任务目标" width="110">
            <template slot-scope="scope">
              <el-select
                size="mini"
                v-model="scope.row.todo.target"
                :disabled="selected_roads==null"
                filterable
                placeholder="选目标"
              >
                <el-option
                  v-for="(item, index) in car_target"
                  :key="index"
                  :label="item"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="任务方向" width="110">
            <template slot-scope="scope">
              <el-select
                size="mini"
                v-model="scope.row.todo.direction"
                :disabled="selected_roads==null"
                filterable
                placeholder="选方向"
              >
                <el-option
                  v-for="(item, index) in  car_direction"
                  :key="index"
                  :label="item"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="任务类型" width="110">
            <template slot-scope="scope">
              <el-select
                size="mini"
                v-model="scope.row.todo.action"
                :disabled="selected_roads==null"
                filterable
                placeholder="选类型"
              >
                <el-option
                  v-for="(item, index) in car_action"
                  :key="index"
                  :label="item"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="56">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="8">&nbsp;</el-col>
          <el-col :span="6">任务循环次数</el-col>
          <el-col :span="10">
            <el-select
              size="mini"
              v-model="select_cycle"
              :disabled="selected_roads==null"
              filterable
              placeholder="请选择次数"
              @change="push_cycle"
            >
              <el-option v-for="(item, index) in 10" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="19">&nbsp;</el-col>
          <el-col :span="4">
            <el-button
              round
              size="mini"
              type="primary"
              @click="on_publish_mission()"
              :disabled="selected_roads == null ||  tableData.length == 0 || tableData.length >= 1 && (tableData[tableData.length-1].node == null || tableData[tableData.length-1].todo.target == null || tableData[tableData.length-1].todo.direction == null || tableData[tableData.length-1].todo.action == null) || select_cycle == null"
            >任务发布</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-row>
        <el-col :span="4" class="TaskInf">任务信息</el-col>
      </el-row>
      <el-row class="TaskInfState">
        <el-col :span="4">选择显示任务状态</el-col>
        <el-col :span="6">
          <el-select
            size="mini"
            v-model="choice_status"
            :disabled="selected_roads==null"
            filterable
            placeholder="请选择任务状态"
            @change="push_status"
          >
            <el-option
              v-for="(item, index) in task_status"
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
                    <div v-if="choice_status==='出错'">
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
          <el-table-column label="任务ID" prop="task_id"></el-table-column>
          <el-table-column label="设备ID" prop="car_id"></el-table-column>
          <el-table-column label="任务状态" prop="description"></el-table-column>
          <el-table-column label="当前位置" prop="currentNode"></el-table-column>
          <el-table-column label="当前循环数" prop="repeatIndex"></el-table-column>
          <el-table-column label="总循环数" prop="repeat"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import carMap from "./parts/carMap";
import mqtt_client from "../../library/mqtt";
import $ from "jquery";

export default {
  components: { carMap },
  data() {
    return {
      isCollapse: true,
      select_end: null, //选择终点
      select_start: null, //选择起点

      select_cycle: 1, //循环次数
      select_end_action: null, //终点类型
      select_end_direction: null, //终点方向
      select_end_target: null, //终点目标

      select_action: null, //任务类型
      select_target: null, //任务目标
      select_direction: null, //任务方向
      selected_roads: null, //选择路网名称
      road_names_list: [], //路网文件名称数组
      current_road_data: {}, //当前所选路网文件内容
      choice_status: null, //任务状态

      //车的任务类型 */
      car_action: ["取货", "放货"],
      car_target: ["货架1层", "货架2层", "货架3层", "传送带"],
      car_direction: ["左方向", "右方向"],

      tableData: [],

      task_status: ["进行中", "规划失败", "已完成", "出错"],

      mission: {
        //更新任务
        content: [],
        repeat: 1
      },

      response_car_Task_data: {}, //mqtt返回car数据

      response_wait_task_show: {}, //wait
      response_error_task_show: {}, //error
      response_finish_task_show: {}, //finish
      response_process_task_show: {}, //process

      dialogTableVisibleWait: false, //等待任务
      dialogTableVisibleProcess: false, //进行中任务
      dialogTableVisibleFinish: false, //完成任务
      dialogTableVisibleError: false, //出错任务

      activeName: "first",

      error: false,
      finish: false,
      wait: false,
      process: false,

      taskTableData: [],
      wait_task_table: [],
      error_task_table: [],
      finish_task_table: [],
      process_task_table: [],

      getRowKeys(row) {
        return row.task_id;
      },
      expands: []
    };
  },

  mounted() {
    this.pull_road_names_list();

    mqtt_client.subscribe(
      "testProject/clientSub/baseState",
      { qos: 1 },
      error => {
        if (error) console.log("订阅失败:", error);
        else console.log("订阅成功");
      }
    );

    //receive message then parse mission data
    mqtt_client.on("message", (topic, payload) => {
      if (topic == "testProject/clientSub/baseState") {
        this.parse_mission(payload).then(data => {
          if (task_id_valid(data.task_id)) {
            this.$set(this.response_car_Task_data, data.task_id, data);
          }
          function task_id_valid(id) {
            return Boolean(typeof id == "string" && id.length > 0);
          }
        });
      }
    });
  },

  computed: {
    road_places: function() {
      let places = this.current_road_data.places;
      return places && Array.isArray(places) ? places : [];
    },

    // 当前路的所有路径,(带坐标)
    road_lines: function() {
      let lines = this.current_road_data.lines;
      return lines && Array.isArray(lines) ? lines : [];
    },

    // 当前路的所有路径,(带下标)
    road_lines_index: function() {
      let index = this.current_road_data.linesIndex;
      return index && Array.isArray(index) ? index : [];
    },

    carid_to_mission: function() {
      //任务所有数据
      return this.response_car_Task_data;
    },
    wait_task_show: function() {
      //等待任务数据
      return this.response_wait_task_show;
    },
    error_task_show: function() {
      //出错任务数据
      return this.response_error_task_show;
    },
    finish_task_show: function() {
      //完成任务数据
      return this.response_finish_task_show;
    },
    process_task_show: function() {
      //进行中任务
      return this.response_process_task_show;
    }
  },

  watch: {
    current_road_data: {
      handler: function handler(val) {
        //数据更新显示到地图
        this.data_to_map(this.$refs.carMap, val.places, val.lines, false);
      },
      deep: true // handler监听函数，深度监听
    },

    response_car_Task_data: {
      handler: function handle(task) {
        for (let key in task) {
          let repeat = task[key].mission.repeat;
          let content = task[key].mission.content;
          let state = task[key].mission.execDetails.state;
          let repeatIndex = task[key].mission.execDetails.repeatIndex;
          let currentNode = task[key].mission.execDetails.currentNode;
          let contentIndex = task[key].mission.execDetails.contentIndex - 1;

          let task_type;
          // 判断已完成
          if (
            repeatIndex == repeat &&
            currentNode == content[content.length - 1].node
          ) {
            console.log("finish", repeatIndex, repeat);
            task_type = "finish";
            task[key].description = "已完成";
          }
          // 任务进行中
          else if (repeatIndex <= repeat && currentNode != "error") {
            task_type = "process";
            task[key].description = "执行第" + repeatIndex + "次";
          } else if (currentNode == "error") {
            task[key].description = "任务出错";
            task_type = "error";
          }

          this.update_task_show(task_type, key, task[key]);
        }
      },
      deep: true
    }
  },

  methods: {
    push_task_into_table(status, name) {
      let temp_table = [];
      for (let key in status) {
        temp_table.push({
          task_id: status[key].task_id,
          car_id: status[key].car_id,
          description: status[key].description,
          currentNode: status[key].mission.execDetails.currentNode,
          repeat: status[key].mission.repeat,
          repeatIndex: status[key].mission.execDetails.repeatIndex,
          mission: status[key].mission
        });
      }
      if (status == this.response_process_task_show) {
        this.process_task_table = temp_table;
        if (name == "进行中") {
          this.taskTableData = this.process_task_table;
          console.log(this.taskTableData);
        }
      } else if (status == this.response_wait_task_show) {
        this.wait_task_table = temp_table;
        if (name == "规划失败") {
          this.taskTableData = this.wait_task_table;
        }
      } else if (status == this.response_finish_task_show) {
        this.finish_task_table = temp_table;
        if (name == "已完成") {
          this.taskTableData = this.finish_task_table;
        }
      } else if (status == this.response_error_task_show) {
        this.error_task_table = temp_table;
        if (name == "出错") {
          this.taskTableData = this.error_task_table;
        }
      }
      // console.log(this.taskTableData);
    },

    push_status() {
      if (this.choice_status == "进行中") {
        this.taskTableData = this.process_task_table;
      } else if (this.choice_status == "规划失败") {
        this.taskTableData = this.wait_task_table;
      } else if (this.choice_status == "已完成") {
        this.taskTableData = this.finish_task_table;
      } else if (this.choice_status == "出错") {
        this.taskTableData = this.error_task_table;
      }
    },

    addRow() {
      this.tableData.push({
        node: null,

        todo: {
          action: null,

          target: null,

          direction: null
        }
      });
    },

    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    async on_selected_road_change() {
      this.pull_road_data_by_name();
    },
    on_publish_mission() {
      this.mission.content = this.tableData;
      this.publish_mission(this.mission);
      // this.tableData = [];
    },

    // 任务发布
    async publish_mission(task) {
      await validate_task(task);
      let url = "/api/optics/mission/publish";
      let response = await this.$http.post(url, task);
      if (response.status == 200) {
        let result = {
          task_id: null,
          car_id: null,
          mission: {},
          description: ""
        };

        result.car_id = response.data.car_id;
        result.task_id = response.data.mission.task_id;
        result.mission = response.data.mission;

        console.log(response.data.mission);
        if (!response.data.error) {
          result.description = "执行中";
          this.update_task_show("process", result.task_id, result);
        } else {
          result.description = "等待";
          this.update_task_show("wait", result.task_id, result);
        }

        if (result.car_id) {
          this.$notify({
            title: "成功",
            message: "任务已发布：" + result.car_id,
            type: "success"
          });
        } else {
          this.$notify({
            title: "失败",
            message: "任务未发布：" + "没有空闲车辆",
            type: "warning"
          });
        }
      }

      async function validate_task(task) {
        if (!$.isPlainObject(task)) {
          throw "task not object";
        }
        if (!Array.isArray(task.content)) {
          throw "task.content not array";
        }
        if (!$.isPlainObject(task.content[0].todo)) {
          throw "task.content[0].todo is not Object";
        }
      }
    },
    // 解析mqtt消息，构造页面展示所需数据结构
    async parse_mission(payload) {
      let result = {
        task_id: null,
        car_id: null,
        mission: {},
        description: ""
      };
      payload = JSON.parse(payload.toString());
      result.task_id = payload.mission.task_id;
      result.car_id = payload.vehicleInfo[1];
      result.mission = payload.mission;
      // console.log(payload.mission);

      return result;
    },
    // 统一更新所有任务map，不做业务逻辑判断
    async update_task_show(type, key, task) {
      switch (type) {
        case "wait":
          this.$set(this.response_wait_task_show, key, task);
          this.$delete(this.response_finish_task_show, key);
          this.$delete(this.response_error_task_show, key);
          this.$delete(this.response_process_task_show, key);
          break;
        case "finish":
          this.$set(this.response_finish_task_show, key, task);
          this.$delete(this.response_wait_task_show, key);
          this.$delete(this.response_error_task_show, key);
          this.$delete(this.response_process_task_show, key);
          break;
        case "process":
          this.$set(this.response_process_task_show, key, task);
          this.$delete(this.response_wait_task_show, key);
          this.$delete(this.response_error_task_show, key);
          this.$delete(this.response_finish_task_show, key);
          break;
        case "error":
          this.$set(this.response_error_task_show, key, task);
          this.$delete(this.response_wait_task_show, key);
          this.$delete(this.response_process_task_show, key);
          this.$delete(this.response_finish_task_show, key);
          break;
      }
      this.push_task_into_table(
        this.response_wait_task_show,
        this.choice_status
      );
      this.push_task_into_table(
        this.response_finish_task_show,
        this.choice_status
      );
      this.push_task_into_table(
        this.response_process_task_show,
        this.choice_status
      );
      this.push_task_into_table(
        this.response_error_task_show,
        this.choice_status
      );
    },

    async pull_road_data_by_name() {
      // {file: ""}
      let name = this.selected_roads;
      let url = "/api/agv/fileManager/getRoadData";
      let data = { file: name };
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
          return alert("获取地图数据失败");
        }
        this.check_road_data_props(response.data);
        this.current_road_data = response.data;
        this.manual_data_to_map();
      });
    },

    // map组件数据更新渲染
    data_to_map(map, places, lines, autozoom) {
      map.places = places; //map相当于carMap实例然后map.places、map.lines调用属性
      map.lines = lines;
      if (autozoom) {
        let centor = calcCentor(places);
        map.map.getView().setCenter(centor);
        map.map.getView().setZoom(2);
      }

      function calcCentor(places) {
        let centor = [0, 0];
        places.forEach(val => {
          centor[0] += parseFloat(val.xy[0]);
          centor[1] += parseFloat(val.xy[1]);
        });
        centor[0] /= places.length;
        centor[1] /= places.length;
        return centor;
      }
    },

    manual_data_to_map() {
      this.data_to_map(
        this.$refs.carMap,
        this.road_places,
        this.road_lines,
        true
      );
    },

    // 地图文件列表，属性校验
    async check_road_name_props(content) {
      if (!Array.isArray(content))
        return console.error("road name list is not array");
      content.forEach(val => {
        if (typeof val !== "string")
          console.error("road name list is not array");
      });
    },

    // 地图文件数据，属性校验
    async check_road_data_props(content) {
      if ($.isPlainObject(content)) {
        let props = ["places", "lines", "linesIndex"];
        for (let val of props) {
          if (!content.hasOwnProperty(val))
            console.error(val, "property is not object");
          if (!Array.isArray(content[val]))
            console.error(val, "property is not array");
        }
      }
    },

    async pull_road_names_list() {
      let url = "api/agv/fileManager/getFileList";
      let data = { src: "local", type: "road" };
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
          return alert("获取地图文件失败");
        }
        this.check_road_name_props(response.data);
        this.road_names_list = response.data;
      });
    },

    push_end(row) {
      this.mission.content[this.mission.count].node = row.select_end;
    },

    push_cycle() {
      this.mission.repeat = this.select_cycle;
    },

    push_end_action(row) {
      this.mission.content[this.mission.count].todo.action =
        row.select_end_action;
    },

    push_end_direction(row) {
      this.mission.content[this.mission.count].todo.direction =
        row.select_end_direction;
    },

    push_end_target(row) {
      this.mission.content[this.mission.count].todo.target =
        row.select_end_target;
    },

    changeProcessFlag() {
      this.finish = false;
      this.wait = false;
      this.error = false;
      this.process = true;
    },

    changeWaitFlag() {
      this.finish = false;
      this.error = false;
      this.process = false;
      this.wait = true;
    },

    changeFinishFlag() {
      this.error = false;
      this.process = false;
      this.wait = false;
      this.finish = true;
    },

    changeErrorFlag() {
      this.process = false;
      this.wait = false;
      this.finish = false;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: -15px;
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

  margin-left: 5px;
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
  margin-left: -30px;
}

.el-steps-ss {
  color: #cfddeb;
}
</style>

<style>
</style>
