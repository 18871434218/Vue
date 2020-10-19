<template>
  <el-container id="home">
    <el-aside style="width:120px;">
      <left-nav key="0" v-if="systemCode=='调度平台'" @system="changeSys"></left-nav>
    </el-aside>

    <el-container class="container-add">
      <el-header style="height: 168px;">
        <el-row>
          <el-col :span="12">
            <el-row id="nv_row1">Optics Factory Management</el-row>
            <el-row id="nv_row2">{{pagename}}</el-row>
          </el-col>

          <el-col :span="12">
            <img
              class="logo"
              style="float:right"
              :src=" require('../assets/img/login/登录页logo-18.png')"
            />
          </el-col>
        </el-row>
      </el-header>

      <el-main id="page_all_operations">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mqttClient from '../library/mqtt';
export default {
  name: 'HelloWorld',
  data() {
    return {
      systemCode: '调度平台',
      data: {
        baseState: [],
        errorInfo: [],
        ip: '',
        mission: {},
        vehicleInfo: []
      }
    };
  },
  computed: {
    pagename() {
      return this.$store.state.publicData.currentPage.name;
    }
  },
  watch: {
    data: {
      handler: function handle(val) {
        var flag = this.$store.getters['mapData/hadCar'](val);
        console.log('data:' + flag);
        if (flag === 1) {
          this.$store.dispatch('mapData/updateCar', val);
          console.log('cars1', this.$store.state.mapData.carsCanUpdate);
        } else if (flag === 0) {
          this.$store.dispatch('mapData/addCar', val);
          console.log('cars2', this.$store.state.mapData.carsCanUpdate);
        }
      },
      deep: true,
      immediate: true
    }
  },

  beforeDestroy() {},
  mounted() {
    this.subscribeMqttTopic();
    // 接收消息处理
    mqttClient.on('message', (topic, message) => {
      message = JSON.parse(message.toString());
      // console.group(topic)
      // console.log(message)
      // console.groupEnd()
      if (topic === 'testProject/clientSub/baseState') {
        this.data = message;
        console.log('-----data', this.data);
      } else if (
        topic ===
        'testProject/' + this.$store.state.publicData.user.name
      ) {
      } else {
      }
    });
    // 断开发起重连
    mqttClient.on('reconnect', () => {
      console.log('正在重连:');
    });
    // 链接异常处理
    mqttClient.on('error', error => {
      console.log('连接失败:', error);
    });
    console.log(this.$store.state.publicData.currentPage.name);
  },

  methods: {
    subscribeMqttTopic() {
      const topic = [
        'testProject/clientSub/baseState',
        'testProject/clientSub/missionReturn',
        'testProject/' + this.$store.state.publicData.user.name
      ];
      mqttClient.subscribe(topic, { qos: 1 }, (err, granted) => {
        console.group('subscribe mqtt topics');
        if (err) console.log(err);
        else console.log(granted);
        console.groupEnd();
      });
    },
    unsubscribeMqttTopic() {
      const topic = [
        'testProject/clientSub/baseState',
        'testProject/clientSub/missionReturn',
        'testProject/' + this.$store.state.publicData.user.name
      ];
      mqttClient.unsubscribe(topic);
    },

    changeSys(data) {
      this.systemCode = data;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/* @import "./SunnyCss.css"; */

#home {
  background-color: #001f3b;
  color: rgba(255, 255, 255, 0.9);
  background-size: 200% 200%;
  overflow: hidden;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  margin: 0px;
}
.el-col {
  padding-left: 0px;
}
.el-row {
  margin-bottom: 0px;
  margin-top: 0px;
}
.el-header {
  padding: 0 0px;
  margin-top: 20px;
}
#page_all_operations {
  padding-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}

#nv_row1 {
  font-size: 30px;
  color: #00fff5;
  padding-left: 0px;
  font-family: SourceHanSansCN-Bold;
}
#nv_row2 {
  font-size: 26px;
  color: #00fff5;
  padding-left: 0px;
  font-family: SourceHanSansCN-Light;
}
</style>
