<template>
  <el-row>
      <div v-for="(item, index) in showRecord" :key="index">
        <span>{{item}}</span>
      </div>
  </el-row>
</template>
<script>
import mqtt_client from "../../../library/mqtt";
export default {
  components: {},
  props: {},
  data() {
    return {
        ResponseRecord: []
    };
  },

  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  computed: {
    showRecord: function () {
      return this.ResponseRecord
    }
  },
  
  mounted() {
     mqtt_client.subscribe(
      "testProject/clientSub/baseState",
      { qos: 1 },
      error => {
        if (error) console.log("订阅失败:", error);
        else console.log("订阅成功");
      }
    );

    mqtt_client.on("message", (topic, payload) => {
      if (topic == "testProject/clientSub/baseState") {
        let responseData = JSON.parse(payload.toString())
        this.ResponseRecord.push(responseData);
        // console.log(payload.data);
      }
    });
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
</style>
