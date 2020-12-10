/* eslint-disable vue/valid-v-model */
<template>
  <div class="content">
    <el-container>
      <el-header>模拟中心</el-header>
      <el-main>
        <el-form>
            <el-form-item label="模拟任务数据发送">
                <el-col :span="8">
                    <el-input type="textarea" placeholder="请输入任务数据" v-model="defaultTask" :autosize="{ minRows: 30, maxRows: 100}" style="auto"></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="toPostTaskList" type="primary">确认发送任务</el-button>
                </el-col>
                <el-col :span="8">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>任务数据案例</span>
                        </div>
                        <div>
                          <pre>{{defaultTaskData}}</pre>
                        </div>
                    </el-card>
                </el-col>
            </el-form-item>

            <el-form-item label="模拟车动作指令">
                <el-col :span="4">
                    <el-input v-model="car_id" placeholder="请输入车辆ID">
                      <template slot="prepend">车辆ID</template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="command" placeholder="请输入指令">
                       <template slot="prepend">车执行指令</template>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button @click="postBack" type="primary">点击模拟车动作指令</el-button>
                </el-col>
            </el-form-item>

            <el-form-item label="模拟人工确认">
                <el-col :span="4">
                    <el-input v-model="task_id" placeholder="请输入任务ID">
                       <template slot="prepend">任务ID</template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="current_node" placeholder="请输入节点">
                       <template slot="prepend">节点</template>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button @click="doubleCheckNode" type="primary">手工确认</el-button>
                </el-col>
            </el-form-item>

            <el-form-item label="模拟传送带">
              <div style="width: 1000px">
                <el-col :span="5">
                    <el-switch v-model="isNormal" active-text="机器正常" inactive-text="机器异常"></el-switch>
                </el-col>
                 <el-col :span="4">
                    <el-switch v-model="isEmpty" active-text="箱子空" inactive-text="箱子满"></el-switch>
                </el-col>
                <el-col :span="5">
                  <el-input v-model="node" placeholder="请输入节点">
                     <template slot="prepend">节点</template>
                  </el-input>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="box_id" placeholder="请输入箱子ID">
                       <template slot="prepend">箱子ID</template>
                    </el-input>
                </el-col>
                <el-button @click="ConveyorBelt" type="primary" style="margin-left:10px;">确认</el-button>
              </div>
            </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      car_id: null,
      defaultTask: null,
      defaultTaskData:
       [
         {
            taskId: '20DFDFJYWYYY', // 任务ID(唯一)
            taskType: 'coating', // 任务类型
            boxId: 'boxid1', // 箱子ID
            content: [ // 任务类型
                {
                    area: 'A', //  区域名称
                    roadNodes: [ // 该区域需要执行任务的路网节点
                        {
                            node: 1, // 节点序号
                            todo: { // 执行指令
                                action: 1, // 1：取货 2：放货
                                target: 1, // 1：货架1层  2: 货架2层  3：货架3层  4：传送带
                                direction: 1, // 1：左方向   2：右方向
                                endLevel: 1 // 动作结束的判断等级   0：机器自动判断结束   1：必须由操作人员扫码判定结束
                            },
                            goods: { // 货物属性
                                type: 0, // 货物类型
                                weight: 0 // 货物重量
                            }
                        },
                        {
                            node: 2, // 同理
                            todo: {
                                action: 1,
                                target: 1,
                                direction: 1,
                                endLevel: 1
                            },
                            goods: {
                                type: 0,
                                weight: 10
                            }
                        }
                    ],
                    repeat: 1 // 该区域此指令执行的重复次数
                },
                {
                    area: 'B',
                    roadNodes: [
                        {
                            node: 3,
                            todo: {
                                action: 2,
                                target: 4,
                                direction: 1,
                                endLevel: 1
                            },
                            goods: {
                                type: 0,
                                weight: 0
                            }
                        },
                        {
                            node: 4,
                            todo: {
                                action: 2,
                                target: 3,
                                direction: 1,
                                endLevel: 1
                            },
                            goods: {
                                type: 0,
                                weight: 0
                            }
                        }
                    ],
                    repeat: 1
                }
            ]
        }
      ],
      flag: true,
      node: null,
      isEmpty: true,
      box_id: null,
      isNormal: true,
      task_id: null,
      current_node: null,
      command: null
    }
  },
  methods: {
    postBack: function () {
      const postData = {
        car_id: this.car_id,
        command: this.command
      }
      const url = '/api/controlCar'
      this.$http.post(url, postData).then(response => {
        if (response.status !== 200) {
         this.$message({
            message: response.data,
            type: 'error'
          })
        } else {
           this.$message({
            message: response.data,
            type: 'success'
          })
        }
      })
    },
    doubleCheckNode: function () {
      const postFinish = {
        task_id: this.task_id,
        node: this.current_node
      }
      const url = '/api/optics/mission/Finish'
      this.$http.post(url, postFinish).then(response => {
        if (response.status !== 200) {
          this.$message({
            message: response.data,
            type: 'error'
          })
        } else {
          this.$message({
            message: response.data,
            type: 'success'
          })
        }
      })
    },
    ConveyorBelt: function () {
      let flag = 0
      if (this.isEmpty === true) {
          flag = 1
      } else {
          flag = 0
      }
      const data = { node: this.node, isEmpty: flag, boxId: this.box_id, isNormal: this.isNormal }
      const url = '/api/setStateSunny'
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
           this.$message({
            message: response.data,
            type: 'error'
          })
        } else {
          this.$message({
            message: response.data,
            type: 'success'
          })
        }
      })
    },
    toPostTaskList: function () {
      const data = JSON.parse(this.defaultTask)
      const url = '/api/optics/mission/allTaskGeneration'
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
          this.$message({
            message: response.data,
            type: 'error'
          })
        } else {
          this.$message({
            message: response.data,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
.el-col {
    padding-left:6px;
    margin-left: 4px;
}
.el-row {
    margin-bottom: 8px;
}
.clearfix:before,
.clearfix:after {
display: table;
content: "";
}
.clearfix:after {
clear: both
}
.box-card {
    height: 640px;
    overflow: auto;

}
</style>
