/* eslint-disable vue/valid-v-model */
<template>
  <div class="content">
    <el-container>
      <el-header>
          模拟中心
      </el-header>
      <el-main>
        <el-form>
            <el-form-item label="任务数据">
                <el-col :span="12">
                    <el-input type="textarea" placeholder="请输入任务数据" v-model="defaultTask" :autosize="flag"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button @click="toPostTaskList" type="primary">确认发送任务</el-button>
                </el-col>
                 <el-col :span="6">
                    <div>{{ responseMessage }}</div>
                </el-col>
            </el-form-item>

            <el-form-item label="模拟车动作指令">
                    <el-col :span="1">车辆ID:</el-col>
                    <el-col :span="3">
                        <el-input v-model="car_id" placeholder="请输入车辆ID"></el-input>
                    </el-col>
                    <el-col :span="2">车执行指令：</el-col>
                    <el-col :span="6">
                        <el-input v-model="command" placeholder="请输入指令"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="postBack" type="primary">点击模拟车动作指令</el-button>
                    </el-col>
            </el-form-item>

            <el-form-item label="模拟人工确认任务">
                    <el-col :span="1">任务ID:</el-col>
                    <el-col :span="2">
                        <el-input v-model="car_id" placeholder="请输入任务ID"></el-input>
                    </el-col>
                    <el-col :span="2">确认节点：</el-col>
                    <el-col :span="6">
                        <el-input v-model="command" placeholder="请输入节点"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="postCar" type="primary">点击模拟手工确认</el-button>
                    </el-col>
            </el-form-item>

            <el-form-item label="模拟传送带">
                    <el-col :span="1">节点:</el-col>
                    <el-col :span="2">
                        <el-input v-model="car_id" placeholder="请输入任务ID"></el-input>
                    </el-col>
                    <el-col :span="1">是否为空:</el-col>
                    <el-col :span="2">
                        <el-input v-model="car_id" placeholder="请输入任务ID"></el-input>
                    </el-col>
                    <el-col :span="2">箱子ID：</el-col>
                    <el-col :span="6">
                        <el-input v-model="command" placeholder="请输入节点"></el-input>
                    </el-col>
                     <el-col :span="1">是否正常:</el-col>
                    <el-col :span="2">
                        <el-input v-model="car_id" placeholder="请输入任务ID"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="ConveyorBelt" type="primary">确认</el-button>
                    </el-col>
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
      flag: true
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
        endFlag: 1,
        clientId: 'ni90',
        carId: 'ni78',
        currentLocation: [12, 56]
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
      const data = { node: 200, isEmpty: 1, boxId: 'boxid1', isNormal: true }
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
      const data = { node: 200, isEmpty: 1, boxId: 'boxid1', isNormal: true }
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
    padding-left:8px;
}
.el-row {
    margin-bottom: 8px;
}
</style>
