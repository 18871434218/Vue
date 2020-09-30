<template>
  <el-row>
     <el-card class="box-card">
         <div v-for="(item, index) in showRecord" :key="index" class="text item">
             {{item}}
         </div>
     </el-card>
  </el-row>
</template>
<script>
// import mqtt_client from "../../../library/mqtt";
export default {
  components: {},
  props: {},
  data() {
    return {
        showRecord: ['nisfd','sfds','nisfd','nisssfd','nisssfd','nisssfd']   // 对象数组
    };
  },

  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},

  mounted() {
    //  mqtt_client.subscribe(
    //   "testProject/clientSub/baseState",
    //   { qos: 1 },
    //   error => {
    //     if (error) console.log("订阅失败:", error);
    //     else console.log("订阅成功");
    //   }
    // );

    // mqtt_client.on("message", (topic, payload) => {
    //   if (topic == "testProject/clientSub/baseState") {
    //     setTimeout(function() {
    //        this.showRecord = payload.data;
    //     }, 3000)
    //   }
    // });
  },

  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.box-card {
    height: 200px;
    width: 480px;
    overflow: auto;
}
</style>
