<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      下拉菜单
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="a">黄金糕</el-dropdown-item>
      <el-dropdown-item command="b">狮子头</el-dropdown-item>
      <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
      <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
      <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>


<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<script>
export default {
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  }
};
</script>