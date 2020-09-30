<template>
  <el-row>
    <el-row>
      <el-form :inline="true" style="width: 670px">
        <el-form-item label="车辆选择">
          <el-select filterable placeholder="请选择车辆" size="mini" v-model="selectDeviceId" @change="inquireDeviceId">
            <el-option v-for="(item, index) in tableData" :key="index" :label="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select filterable placeholder="请选择状态" size="mini" v-model="selectTaskStatus" @change="inquireTaskStatus">
            <el-option v-for="(item, index) in TaskStatus" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="mini" @click="clearSelectData()">清空</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table :data="showDta" border style="width: 650px" ref="dataTable" toggleAllSelection="toSlect">
        <el-table-column type="index" width="50" label="序号"></el-table-column>  
        <el-table-column label="车辆ID" prop="id" ref="filterTableCarId"></el-table-column>
        <el-table-column label="起点" prop="start" ></el-table-column>
        <el-table-column label="终点" prop="end" ></el-table-column>
        <el-table-column label="任务类型" prop="taskType" ></el-table-column>
        <el-table-column label="任务状态" prop="taskStatus" ref="filterTableTaskStatus" filter-method></el-table-column>
        <el-table-column label="当前位置" prop="currentPosition"></el-table-column>
        <el-table-column label="任务时间" prop="taskTime" ></el-table-column>
      </el-table>
    </el-row>


    <!-- <el-row>
        <el-button @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
            ref="filterTable"
            :data="tableData1"
            style="width: 100%">
            <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
            :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="地址"
            :formatter="formatter">
            </el-table-column>
            <el-table-column
            prop="tag"
            label="标签"
            width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
            </el-table-column>
        </el-table>
    </el-row> -->
  </el-row>
</template>

<script>
export default {
  data() {
    return {
        selectDeviceId: null,
        selectTaskStatus: null,
        TaskStatus: ["进行中", "已完成", "等待中", "出错"],
        showDta: null,
        
        tableData: [
                { id: 10001, start: '1', end: '3', taskStatus: '进行中', taskType: '取货', taskTime: '60 minite', currentPosition: 'x:122, y:711' },
                { id: 10002, start: '1', end: '6', taskStatus: '已完成', taskType: '放货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10002, start: '2', end: '5', taskStatus: '已完成', taskType: '取货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10003, start: '3', end: '5', taskStatus: '进行中', taskType: '放货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10002, start: '2', end: '9', taskStatus: '进行中', taskType: '取货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10004, start: '4', end: '4', taskStatus: '已完成 ', taskType: '放货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10004, start: '4', end: '6', taskStatus: '出错 ', taskType: '取货', taskTime: '60 minite', currentPosition: 'x:122, y:711'},
                { id: 10004, start: '5', end: '9', taskStatus: '等待中', taskType: '放货', taskTime: '60 minite', currentPosition: 'x:122, y:711'}
            ],
    };
  },

  computed: {
  },
  mounted() {
    this.showDta = this.tableData;
  },

  methods: {
      inquireDeviceId(val) {
          let dasho = [];
          for(let item of this.tableData) {
            if (item.id == val) {
                  dasho.push(item);
            } 
          }
          this.showDta = dasho;   
          // console.log(this.$refs.dataTable);
      },

      inquireTaskStatus(val) {
          // console.log("test",  this.$refs.filterTableTaskStatus.filterMethod);
          // console.log("22", val);
          let attDa = []
          for(let item of this.tableData) {
            console.log(item);
            if (val === item.taskStatus) {
               attDa.push(item);
            }
          }
          console.log("1", attDa);
          this.showDta = attDa;
          console.log("11", this.tableData);
      },

      clearSelectData() {
        this.showDta = this.tableData;
      },
  }
};
</script>