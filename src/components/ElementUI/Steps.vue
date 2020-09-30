<template>
  <div>
    <ul class="infinite-list" style="overflow:auto;">
      <li v-for="i in count" class="infinite-list-item" :key="i">
        <el-steps :active="showNumber" finish-status="success" process-status="error">
          <el-step title="任务" description="1400065"></el-step>
          <el-step title="选车" description="agv_car3"></el-step>
          <el-step title="起点" description="1"></el-step>
          <el-step title="终点" description="3"></el-step>

          <span>执行规划</span> 
        </el-steps>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNumber: 1,
      count: 1
    };
  }
};
</script>
<style scoped>
</style>