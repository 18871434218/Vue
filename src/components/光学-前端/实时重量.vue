<template>
  <div class="content">
    车辆ID <el-select v-model="selectedCarIdLocal" filterable placeholder="请选择车辆" >
     <el-option
       v-for="item in carID"
       :key="item"
       :label="item"
       :value="item"
     ></el-option>
     </el-select> 当前重量： {{ realWeight }} g
  </div>
</template>
<script>
import mqttClient from '../library/mqtt';
export default {
  data () {
    return {
      carID: [],
      selectedCarIdLocal: null,
      allMessage: null
    }
  },

  watch: {
    allMessage: {
       handler: function handle(val) {
          let onlineCar = [];
          let offlineCar = [];
          for (let i = 0; i< val.length; i++) {
              if (val[i].linking === 'online') {
                onlineCar.push(val[i].id);
              } else {
                offlineCar.push(val[i].id);
              }
          }
          this.carID = onlineCar;
       },
       deep: true
    },

    selectedCarIdLocal(val) {
        if (val != this.selectedCarIdLocal) {
          this.selectedCarIdLocal = val;
        }
    },

    carID(val) {
      this.carID = val; 
    }
  },

  computed: {
     realWeight() {
        if (this.selectedCarIdLocal === null ) {
          return 0;
        } 
        let tmp = this.allMessage.filter(item=> item.id === this.selectedCarIdLocal);
        // console.log(this.allMessage, tmp)
        if(tmp.length !==0){
          return tmp[0].value.agvStatus.weight;
        } else {
          return 0
        }
     } 
  },
  
  mounted() {
    this.subscribeMqttTopic();
    mqttClient.on('message', (topic, message) => {
      try {
         if (topic === 'optics/vehicle/statusInfo') {
           message = JSON.parse(message.toString());
           this.allMessage = message;
        } else {
          console.log('no sunscribe topic');
        }
      } catch (err) {
         console.log('mqtt err:', err);
      }
    });

    mqttClient.on('reconnect', () => {
      console.log('正在重连');
    });

    mqttClient.on('error', error => {
      console.log('连接失败', error);  
    })
  },

  beforeDestroy() {
    this.unsubscribeMqttTopic();
  },

  methods: {
     subscribeMqttTopic() {
       const topic = [
          'optics/vehicle/statusInfo',
       ];
       
       mqttClient.subscribe(topic, {qos: 0 }, (err, granted) => {
           console.log('subscribe mqtt topics');
           if (err) console.log(err);
           else console.log(granted);
           console.groupEnd();
       });
     },

     unsubscribeMqttTopic() {
        const topic = [
          'optics/vehicle/statusInfo',
       ];
       mqttClient.unsubscribe(topic);
     },
  }
}
</script>
<style scoped>
 .content {
   text-align: center;
   font-size: 250%;
   margin-top: 20%;
 }
</style>