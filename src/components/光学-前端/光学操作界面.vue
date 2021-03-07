<template>
  <div class="content">
    <el-container>
      <el-header>模拟中心</el-header>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="switchCard">
          <el-tab-pane label="人工测试" name="first">
            <el-form>
              <el-form-item label="模拟任务数据发送">
                  <el-col :span="3">
                    <el-card class="box-card">
                      <div slot="header" class="clearfix">
                        <span>点击复制任务数据</span>
                      </div>
                      
                      <div class="text item">
                        <el-button class="copyBtnAB" @click="copycotingAB" :data-clipboard-text="JSON.stringify(coatingAB, null, 2)" type="primary">coatingAB</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnABTest" @click="copycotingABTest" :data-clipboard-text="JSON.stringify(coatingABTest, null, 2)" type="primary">coatingAB后门</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnBA" @click="copycoatingBA" :data-clipboard-text="JSON.stringify(coatingBA, null, 2)" type="primary">coatingBA</el-button>
                      </div>
                       <div class="text item">
                        <el-button class="copyBtnBATest" @click="copycoatingBATest" :data-clipboard-text="JSON.stringify(coatingBATest, null, 2)" type="primary">coatingBA后门</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnEBTA" @click="copyEBTA" :data-clipboard-text="JSON.stringify(coatingEBTA, null, 2)" type="primary">EBTA</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnEBTB" @click="copyEBTB" :data-clipboard-text="JSON.stringify(coatingEBTB, null, 2)" type="primary">EBTB</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnresin" @click="copyresin" :data-clipboard-text="JSON.stringify(resin, null, 2)" type="primary">resin</el-button>
                      </div>
                      <div class="text item">
                        <el-button class="copyBtnassemblage" @click="copyassemblage" :data-clipboard-text="JSON.stringify(assemblage, null, 2)" type="primary">assemblage</el-button>
                      </div>
                    </el-card>
                  </el-col>

                  <el-col :span="8">
                    <el-input type="textarea" placeholder="请输入右键粘贴数据" v-model="defaultTask" :autosize="{ minRows: 30, maxRows: 100}"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-button @click="toPostTaskList" type="primary">确认发送任务</el-button>
                  </el-col>
              </el-form-item>
              
              <el-form-item label="上传信息中心">
                  <el-col :span="3">
                    <el-input v-model="currentTaskID" placeholder="当前任务ID">
                      <template slot="prepend">任务ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-input v-model="preTaskID" placeholder="上一个任务ID">
                      <template slot="prepend">任务ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-input v-model="currentBoxID" placeholder="箱子的ID">
                      <template slot="prepend">箱子ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                     <el-input v-model="currentTaskArea" placeholder="区域名称">
                      <template slot="prepend">区域</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-input v-model="currentTaskNode" placeholder="当前节点">
                      <template slot="prepend">节点名称</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-switch v-model="isLeave" active-text="离开" inactive-text="达到"></el-switch>
                  </el-col>
                  <el-col :span="2">
                    <el-switch v-model="isOK" active-text="节点正常" inactive-text="节点异常" style="margin-left:-55px;"></el-switch>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="checkNodeFinish" type="primary">确认</el-button>
                  </el-col>
              </el-form-item>

              <el-form-item label="模拟人工确认">
                <div style="width:1000px">
                  <el-col :span="6">
                    <el-switch v-model="isOrder" active-text="箱子摆正" inactive-text="箱子没摆正"></el-switch>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="task_id" placeholder="请输入任务ID">
                      <template slot="prepend">任务ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="current_node" placeholder="请输入节点">
                      <template slot="prepend">节点</template>
                    </el-input>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="doubleCheckNode" type="primary">手工确认</el-button>  
                  </el-col>
                </div>
              </el-form-item>

              <el-form-item label="模拟传送带">
                <div style="width: 1500px">
                  <el-col :span="5">
                      <el-switch v-model="isNormal" active-text="机器正常" inactive-text="机器异常"></el-switch>
                  </el-col>
                  <el-col :span="4">
                      <el-switch v-model="isEmpty" active-text="节点满" inactive-text="节点空"></el-switch>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="node" placeholder="请输入节点">
                      <template slot="prepend">节点</template>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="box_id" placeholder="请输入箱子ID">
                      <template slot="prepend">箱子ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-input v-model="roadMapName" placeholder="请输入路网">
                      <template slot="prepend">路网</template>
                    </el-input>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="ConveyorBelt" type="primary">确认</el-button>  
                  </el-col>
                </div>
              </el-form-item>
              
              <el-form-item label="设置节点状态">
                <div style="width: 1000px">
                <el-col :span="5">
                  <el-input v-model="currentroadMap" placeholder="请输入路网名称">
                    <template slot="prepend">路网</template>
                  </el-input>
                </el-col>
                <el-col :span="7">
                  <el-input v-model="deviceNodeId" placeholder="请输入节点ID">
                    <template slot="prepend">节点ID</template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                    <el-switch v-model="deviceIsEmpty" active-text="节点空" inactive-text="节点满"></el-switch>
                  </el-col>
                <el-col :span="1">
                   <el-button @click="setNodeStatus" type="primary">确认修改</el-button> 
                </el-col>
                </div>
              </el-form-item>

              <el-form-item label="更新路网">
                <div style="width: 1100px">
                  <el-col :span="7">
                    <el-input v-model="roadmap" placeholder="请输入路网名称">
                      <template slot="prepend">路网名称</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-switch v-model="request_type" active-text="lane" inactive-text="node"></el-switch>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="request_id" placeholder="请输入ID">
                      <template slot="prepend">ID</template>
                    </el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-switch v-model="state" active-text="free" inactive-text="block"></el-switch>
                  </el-col>
                  <el-col :span="1">
                    <el-button @click="setRoadNet" type="primary">确认修改</el-button>    
                  </el-col>
                </div>
              </el-form-item>

              <el-form-item label="终止任务">
                <el-col :span="3">
                  <el-input v-model="currentTaskId" placeholder="请输入任务ID">
                    <template slot="prepend">任务ID</template>
                  </el-input>
                </el-col>
                <el-col :span="1">
                   <el-button @click="abortTask" type="primary">终止任务</el-button>  
                </el-col>
              </el-form-item>

              <el-form-item label="恢复车">
                <el-col :span="3">
                  <el-input v-model="currentCarId" placeholder="请输入车ID">
                    <template slot="prepend">车ID</template>
                  </el-input>
                </el-col>
                <el-col :span="1">
                   <el-button @click="recoveryCar" type="primary">确认恢复</el-button> 
                </el-col>
              </el-form-item>

               <el-form-item label="重启CTU">
                <el-col :span="3">
                  <el-input v-model="carID" placeholder="请输入车ID">
                    <template slot="prepend">车ID</template>
                  </el-input>
                </el-col>
                <el-col :span="1">
                   <el-button @click="restartCtu" type="primary">重启</el-button> 
                </el-col>
              </el-form-item>
              
               <el-form-item label="重置节点路径">
                <el-col :span="3">
                  <el-input v-model="carIP" placeholder="请输入车IP">
                    <template slot="prepend">车IP</template>
                  </el-input>
                </el-col>
                <el-col :span="1">
                   <el-button @click="resNodeSegment" type="primary">重置</el-button> 
                </el-col>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="自动测试" name="second" >
            <el-card>
              <div slot="header">镀膜车间接口</div>
              <el-form>
                <el-form-item label="任务下发接口">
                  <el-col :span="4"><el-tag :span=6 :type="coatingTaskIssued">{{ coatingTaskFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="上传任务节点信息接口">
                  <el-col :span="4"><el-tag :span=6 :type="coatingNodeIssued">{{ coatingNodeFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="获取暂存位状态接口">
                  <el-col :span="4"><el-tag :span=6 :type="coatingTempBIt">{{ coatingTempBItFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="终止未执行的任务接口">
                  <el-col :span="4"><el-tag :span=6 :type="coatingTerminateTask">{{ coatingTerminateFlag }}</el-tag></el-col>
                </el-form-item>
              </el-form>
            </el-card>

            <el-card>
              <div slot="header">树脂车间接口</div>
              <el-form>
                <el-form-item label="任务下发接口">
                  <el-col :span="4"><el-tag :span=6 :type="resinTaskIssued">{{ resinTaskFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="上传任务节点信息接口">
                  <el-col :span="4"><el-tag :span=6 :type="resinNodeIssued">{{ resinNodeFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="实时重量信息查询">
                  <el-col :span="4"><el-tag :span=6 :type="resinRealWeight">{{ resinRealWeightFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="检测重量达标，手动点击完成接口">
                  <el-col :span="4"><el-tag :span=6 :type="resinHandleCheck">{{ resinHandleCheckFlag }}</el-tag></el-col>
                </el-form-item>
              </el-form>
            </el-card>

            <el-card>
              <div slot="header">组立线车间接口</div>
              <el-form>
                <el-form-item label="任务下发接口">
                  <el-col :span="4"><el-tag :span=6 :type="assemblyTaskIssued">{{ assemblyTaskFlag }}</el-tag></el-col>
                </el-form-item>
                <el-form-item label="上传任务节点信息接口">
                  <el-col :span="4"><el-tag :span=6 :type="assemblyNodeIssued">{{ assemblyNodeFlag }}</el-tag></el-col>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import { coatingAB, coatingABTest, coatingBA,  coatingBATest, coatingEBTA, coatingEBTB, resin, assemblage } from '../assets/test.json'
export default {
  data () {
    return {
      coatingAB,
      coatingABTest,
      coatingBA,
      coatingBATest,
      coatingEBTA,
      coatingEBTB,
      resin,
      assemblage,

      currentroadMap: null,
      deviceNodeId: null,
      deviceIsEmpty: true, 
      currentTaskID: null,
      preTaskID: null,
      currentBoxID: null,
      currentTaskArea: null,
      currentTaskNode: null,
      isLeave: true,
      isOK: true,

      time: '',
      activeName: 'first',
      currentTaskId: null,
      currentCarId: null,
      car_id: null,
      defaultTask: null,

      flag: true,
      node: null,
      isEmpty: true,
      box_id: null,
      isNormal: true,
      isOrder: true,
      task_id: null,
      current_node: null,

      roadmap: null,
      request_type: true,
      request_id: null,
      state: true,
      
      errtask: 
       [
         {
            taskId: '20DFDFJYWYYY', // 任务ID(唯一)
            taskType: 'coating', // 任务类型
            preTaskId: '0', //上一个任务ID
            boxId: 'boxid1', // 箱子ID
            content: [ // 任务类型
                {
                    roadNodes: [ // 该区域需要执行任务的路网节点
                        {
                            node: 1, // 节点序号
                            todo: { // 执行指令
                                type: 'LIFT',
                                action: 11, // 1：取货 2：放货
                                target: 1, // 1：货架1层  2: 货架2层  3：货架3层  4：传送带
                                direction: 1, // 1：左方向   2：右方向
                                endLevel: 0 // 动作结束的判断等级   0：机器自动判断结束   1：必须由操作人员扫码判定结束
                            },
                            goods: { // 货物属性
                                type: 0, // 货物类型
                                weight: 0 // 货物重量
                            }
                        },
                        {
                            node: 2, // 同理
                            todo: {
                                type: 'LIFT',
                                action: 11,
                                target: 1,
                                direction: 1,
                                endLevel: 0
                            },
                            goods: {
                                type: 0,
                                weight: 0
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
                                type: 'LIFT',
                                action: 11,
                                target: 1,
                                direction: 1,
                                endLevel: 0
                            },
                            goods: {
                                type: 0,
                                weight: 0
                            }
                        },
                        {
                            node: 4,
                            todo: {
                                type: 'LIFT',
                                action: 11,
                                target: 1,
                                direction: 1,
                                endLevel: 0
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
      coatingTaskIssued: 'warning',
      coatingTaskFlag: '离线',
      coatingNodeIssued: 'warning',
      coatingNodeFlag: '外部接口暂定',
      coatingTempBIt: 'warning',
      coatingTempBItFlag: '外部接口暂定',
      coatingTerminateTask: 'warning',
      coatingTerminateFlag: '离线',
      
      resinTaskIssued: 'warning',
      resinTaskFlag: '离线',
      resinNodeIssued: 'warning',
      resinNodeFlag: '外部接口暂定',
      resinRealWeight: 'warning',
      resinRealWeightFlag: '离线',
      resinHandleCheck: 'warning',
      resinHandleCheckFlag: '离线',

      assemblyTaskIssued: 'warning',
      assemblyTaskFlag: '离线',
      assemblyNodeIssued: 'warning',
      assemblyNodeFlag: '外部接口暂定',

      roadMapName: null,
      carID: null,
      carIP: null
    }
  },

  methods: {
    doubleCheckNode: function () {
      let status;
      if (this.isOrder === true) {
        status = 1;
      } else {
        status = 0;
      }
      const postFinish = {
        taskId: this.task_id,
        currentNode: Number(this.current_node),
        status: status
      }
      console.log('doubleData', postFinish);
      const url = '/api/optics/mission/handCheckOver'
      this.$http.post(url, postFinish).then(response => {
        if (response.data.code !== 200) {
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
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    ConveyorBelt: function () {
      const data = { node: this.node, isFull: this.isEmpty, boxId: this.box_id, isNormal: this.isNormal, area: this.roadMapName };
      const url = '/api/setStateSunny'
      this.$http.post(url, data).then(response => {
        if (response.data.code !== 200) {
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
      }).catch((err) => {
         this.$message({
            message: err,
            type: 'error'
          })
      })
    },
    toPostTaskList: function () {
      try {
        const data = JSON.parse(this.defaultTask);
        for (let i = 0; i < data.length; i++) {
          data[i].taskId = data[i].taskId + '__'+ Math.random().toString(16).substr(2, 4);
        }
        console.log('11', data);
        const url = '/api/optics/mission/taskGeneration';
        this.$http.post(url, data).then(response => {
        if (response.data.code !== 200) {
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
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
      } catch(error) {
         this.$message({
            message: '输入任务格式有误，请仔细检查',
            type: 'error'
          })
      };
    },
    setRoadNet: function () {
      let roadType = null;
      if (this.request_type === true) {
          roadType = 'lane';
      } else {
          roadType = 'node';
      }
      
      let roadState = null;
      if (this.state === true) {
          roadState = 'free';
      } else {
          roadState = 'block';
      }

      const data = { roadmap: this.roadmap, request_type: roadType, request_id: Number(this.request_id), state: roadState };
      const url = '/api/setRoadNet';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
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
      }).catch((err) => {
        this.$message({
            message: err,
            type: 'error'
          })
      })
    },
    abortTask: function () {
      const data = { taskId: this.currentTaskId }; 
      const url = '/api/optics/abortTask';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
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
      }).catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
      })
    },
    recoveryCar: function () {
      const data = { carId: this.currentCarId }; 
      const url = '/api/optics/recoveryCar';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
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
      }).catch((err) => {
        this.$message({
            message: err,
            type: 'error'
         })
      })
    },

    restartCtu: function () {
      const data = { carId: this.carID };
      const url = '/api/optics/restartCtu';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
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
      }).catch((err) => {
        this.$message({
            message: err,
            type: 'error'
         })
      })
    },

    resNodeSegment: function () {
      const data = { carIP: this.carIP };
      const url = '/api/optics/resetNodeSeg';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
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
      }).catch((err) => {
        this.$message({
            message: err,
            type: 'error'
         })
      })
    },

    checkNodeFinish: function () {
      let type;
      if (this.isLeave === true) {
        type = 0;
      } else {
        type = 1;
      }

      let status;
      if (this.isOK === true) {
        status = 1;
      } else {
        status = 0;
      }
      const data = { taskId: this.currentTaskID, preTaskId: this.preTaskID, boxId: this.currentBoxID, area: this.currentTaskArea, node: Number(this.currentTaskNode), type: type, status: status };
      console.log('111', data); 
      const url = '/api/toInformationCenter';
      this.$http.post(url, data).then(response => {
        if (response.data.code != 200) {
          this.$message({
            message: response.data.message,
            type: 'error'
          })
        } else {
          this.$message({
            message: response.data.message,
            type: 'success'
          })
        }
      }).catch((err) => {
         this.$message({
            message: err,
            type: 'error'
        })
      })
    },

    coatingTaskIssuedAction() {
      const data = this.errtask; 
      const url = '/api/optics/mission/taskGeneration';
      console.log('11111111111111111111111111111');
        this.$http.post(url, data).then(response => {
        console.log('22222222222222222222', response.status);
        if (response.status === 404) {
          console.log('3333333333333333333333333', response.status);
          this.coatingTaskIssued = 'warning';
          this.coatingTaskFlag = '离线';
          this.resinTaskIssued = 'warning';
          this.resinTaskFlag = '离线';
          this.assemblyTaskIssued = 'warning';
          this.assemblyTaskFlag = '离线';
        } else {
          console.log('4444444444444444444444444', response.status);
          this.coatingTaskIssued = 'success';
          this.coatingTaskFlag = '在线';
          this.resinTaskIssued = 'success';
          this.resinTaskFlag = '在线';
          this.assemblyTaskIssued = 'success';
          this.assemblyTaskFlag = '在线';
        }}).catch((err) => {
          console.log('55555555555555555555555', err);
          this.coatingTaskIssued = 'warning';
          this.coatingTaskFlag = '离线';
          console.log('66666666666666666666666', this.coatingTaskFlag);
          this.resinTaskIssued = 'warning';
          this.resinTaskFlag = '离线';
          this.assemblyTaskIssued = 'warning';
          this.assemblyTaskFlag = '离线';
        })
    },

    coatingNodeIssuedAction: function () {
      const data = { taskId: '', preTaskId:'', boxId: '', area: '', node: 1, status: 1, flag: 'arrive' }; 
      const url = '/api/optics/mission/CheckNodes';
      this.$http.post(url, data).then(response => {
       if (response.status === 404) {
        this.coatingNodeIssued = 'warning';
        this.coatingNodeFlag = '离线'; 
       } else {
         this.coatingNodeIssued = 'success';
         this.coatingNodeFlag = '在线';
       }
      }).catch((err) => {
        this.coatingNodeIssued = 'warning';
        this.coatingNodeFlag = '离线'; 
      })
    },

    coatingTempBItAction: function () {
      const data = { node: 1, state: 1 }; 
      const url = '/api/optics/mission/temporaryStorageBitState';
      this.$http.post(url, data).then(response => {
        if (response.status === 404) {
          this.coatingTempBIt = 'warning';
          this.coatingTempBItFlag = '离线';
        } else {
          this.coatingTempBIt = 'success';
          this.coatingTempBItFlag = '在线';
        }
      }).catch((err) => {
         this.coatingTempBIt = 'warning';
         this.coatingTempBItFlag = '离线';
      })
    },

    setNodeStatus: function () {
      let deviceStatus;
      if (this.deviceIsEmpty === true) {
        deviceStatus = 0;
      } else {
        deviceStatus = 1;
      }
      const data = { node: Number(this.deviceNodeId), state: deviceStatus, roadMap: this.currentroadMap}; 
      const url = '/api/onlySetDeviceStatus';
      this.$http.post(url, data).then(response => {
        if (response.data.code !== 200) {
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
      }).catch((err) => {
         this.$message({
            message: err,
            type: 'error'
          })
      }) 
    }, 

    coatingTerminateTaskAction: function () {
      const data = { carId: this.currentCarId }; 
      const url = '/api/optics/mission/terminateTask';
      this.$http.post(url, data).then(response => {
        if (response.status === 404) {
          this.coatingTerminateTask = 'warning';
          this.coatingTerminateFlag = '离线';
        } else {
          this.coatingTerminateTask = 'success';
          this.coatingTerminateFlag = '在线';
        }
      }).catch((err) => {
        this.coatingTerminateTask = 'warning';
        this.coatingTerminateFlag = '离线';
      })
    },

    resinRealWeightAction: function () {
        const data = { taskId: "1" }; 
        const url = '/api/optics/mission/realTimeWeight';
        this.$http.post(url, data).then(response => {
        if (response.status === 404) {
          this.resinRealWeight = 'warning';
          this.resinRealWeightFlag = '离线';
        } else {
          this.resinRealWeight = 'success';
          this.resinRealWeightFlag = '在线';
        }
      }).catch((err) => {
         this.resinRealWeight = 'warning';
         this.resinRealWeightFlag = '离线';
      })
    },

    resinHandleCheckAction: function () {
      const data = { taskId: "1", currentNode: 1 }; 
      const url = '/api/optics/mission/handCheckOver';
      this.$http.post(url, data).then(response => {
       if (response.status === 404) {
         this.resinHandleCheck = 'warning';
         this.resinHandleCheckFlag = '离线';
       } else {
         this.resinHandleCheck = 'success';
         this.resinHandleCheckFlag = '在线';
       }
      }).catch((err) => {
        this.resinHandleCheck = 'warning';
        console.log('1111111', this.resinHandleCheck);
        this.resinHandleCheckFlag = '离线';
      })
    },

    switchCard: function (tab) {
      let chickName = tab.name;
      if (chickName === 'second') {
        this.time = setInterval(() => {
          this.coatingTaskIssuedAction();
          this.coatingTerminateTaskAction();
          this.resinRealWeightAction();
          this.resinHandleCheckAction();
        }, 1000)
      } else {
        clearInterval(this.time);
      }
    },

    copycotingAB: function() {
          var clipboard = new Clipboard('.copyBtnAB');
          // console.log('AB', this.coatingAB);
          console.log('taskId', this.coatingAB.taskId);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(coatingAB, null, 2)
              this.$message({
                  message: '已成功复制',
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败',
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
    },

    copycotingABTest: function() {
          var clipboard = new Clipboard('.copyBtnABTest');
          console.log('ABTest', this.coatingAB);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(coatingABTest, null, 2)
              this.$message({
                  message: '已成功复制',
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败',
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
    },
    
    copycoatingBA: function() {
      var clipboard = new Clipboard('.copyBtnBA');
      console.log('BA', this.coatingBA);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(coatingBA, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
      })
    },

    copycoatingBATest: function() {
      var clipboard = new Clipboard('.copyBtnBATest');
      console.log('BATest', this.coatingBATest);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(coatingBATest, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
      })
    },

    copyEBTA: function() {
      var clipboard = new Clipboard('.copyBtnEBTA');
      console.log('EBTA', this.coatingEBTA);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(coatingEBTA, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
      })
    },

    copyEBTB: function() {
      var clipboard = new Clipboard('.copyBtnEBTB');
      console.log('EBTB', this.coatingEBTB);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(coatingEBTB, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
      })
    },

    copyresin: function() {
      var clipboard = new Clipboard('.copyBtnresin');
      console.log('resin', this.resin);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(resin, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
      })
    },

    copyassemblage: function() {
      var clipboard = new Clipboard('.copyBtnassemblage');
      console.log('assemblage', this.assemblage);
      clipboard.on('success', e => {
          this.defaultTask = JSON.stringify(assemblage, null, 2)
          this.$message({
              message: '已成功复制',
              showClose: true,
              type: 'success'
          })
          clipboard.destroy();
      })

      clipboard.on('error', e => {
          this.$message({ 
              message: '复制失败',
              showClose: true, 
              type: 'error'
            });
          clipboard.destroy();
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
    overflow: auto;
}

.text {
  font-size: 14px;
}

.item {
  padding: 14px 0;
}
</style>
