/* eslint-disable vue/valid-v-model */
<template>
  <div class="content">
    <el-container>
      <el-header>模拟中心</el-header>
      <el-main>
        <el-form>
            <el-form-item label="模拟任务数据发送">
                <el-col :span="8">
                    <el-input type="textarea" placeholder="请输入任务数据" v-model="defaultTask" :autosize="{ minRows: 20, maxRows: 100}"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="toPostTaskList" type="primary">确认发送任务</el-button>
                </el-col>
                <el-col :span="6">
                    <div>{{ responseMessage }}</div>
                </el-col>
            </el-form-item>

            <!-- <el-form-item label="模拟车动作指令">
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
            </el-form-item> -->

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
                    <el-button @click="postCar" type="primary">点击模拟手工确认</el-button>
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
      finishFlag: null,
      carAction: null,
      ConveyorBeltMessage: null,
      car_id: null,
      command: null,
      responseMessage: null,
      defaultTask: null,
      flag: true,
      node: null,
      isEmpty: true,
      box_id: null,
      isNormal: true,
      task_id: null,
      current_node: null
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
          console.log('失败')
        } else {
          console.log('成功')
          this.carAction = response.data
        }
      })
    },
    postCar: function () {
      const postFinish = {
        task_id: this.task_id,
        node: this.current_node
      }
      const url = '/api/optics/mission/Finish'
      this.$http.post(url, postFinish).then(response => {
        if (response.status !== 200) {
          console.log('失败')
        } else {
          console.log('任务确认完成')
          this.finishFlag = response.data
        }
      })
    },
    ConveyorBelt: function () {
      const data = { node: this.node, isEmpty: this.isEmpty, boxId: this.box_id, isNormal: this.isNormal }
      const url = '/api/toSetStateYu'
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
          console.log('失败')
        } else {
          console.log('成功')
          this.ConveyorBeltMessage = response.data
        }
      })
    },
    toPostTaskList: function () {
      const data = this.defaultTask
      const url = '/api/optics/mission/allTaskGeneration'
      this.$http.post(url, data).then(response => {
        if (response.status !== 200) {
          console.log('失败')
        } else {
          console.log('成功')
          this.responseMessage = response.data
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
</style>
