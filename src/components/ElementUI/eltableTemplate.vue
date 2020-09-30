<template>
  <el-row>
    <el-table :data="state_items" size="mini" class="table_transparent">
      <el-table-column>
          <template slot="header">传感器状态</template>
          <template slot-scope="scope">
              <img 
                v-if="scope.row.state_src1 != null"
                :id="scope.row.state_id1"
                :src="scope.row.state_src1"
                width="20"
                height="20"
              />
              <span>{{ scope.row.state_name1 }}</span>
          </template>
      </el-table-column>

      <el-table-column>
          <template slot-scope="scope">
              <img 
                v-if="scope.row.state_src2 != null"
                :id="scope.row.state_id2"
                :src="scope.row.state_src2"
                height="20"
                width="20"
            />
          <span>{{ scope.row.state_name2 }}</span>
          </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      state_items: [
        {
          state_id1: "locationInfoImg",
          state_name1: "位置信息",
          state_src1: require("../../assets/icon-26.png"),
          state_id2: "cameraInfoImg",
          state_name2: "相机",
          state_src2: require("../../assets/icon-26.png")
        },
        {
          state_id1: "lidarInfoImg",
          state_name1: "激光雷达",
          state_src1: require("../../assets/icon-26.png"),
          state_id2: "MMWRInfoImg",
          state_name2: "任务执行",
          state_src2: require("../../assets/icon-26.png")
        },
        {
          state_id1: "MMWRInfoImg",
          state_name1: "毫米波雷达",
          state_src1: require("../../assets/icon-26.png"),
          state_id2: "controllerInfoImg",
          state_name2: "控制器",
          state_src2: require("../../assets/icon-26.png")
        },
        {
          state_id1: "ultrasonicRadarInfoImg",
          state_name1: "超声波雷达",
          state_src1: require("../../assets/icon-26.png")
        }
      ]
    }
  }
};
</script>

<style>
/* 去掉表格单元格边框 */
.table_transparent th {
    border: none;
}
.table_transparent td, .table_transparent th.isleaf {
    border: none;
}

/* 表格最外边框 */
.el-table--border, .el-table--group {
    border: none;
}

/* 头部边框 */
.table_transparent thead tr th.is-leaf {
    /* border: 1px solid #EBEEF5;
    border-right: none; */
    border: none;
}

/* 表格最外层边框-底部边框 */
.el-table--border::after, .el-table--group::after {
    border: none;
    width: 0;
}

html {
    display: block;
    border: none;
}
</style>