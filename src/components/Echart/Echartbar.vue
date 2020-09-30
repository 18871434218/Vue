<template>
    <div>
        <div :id="elId" class="container"></div>
    </div>
</template>

<script>
// 引入基本模板
import echarts from "echarts";
//引入uuid文件
import uuidv1 from "uuid/v1";
export default {
    data() {
    return {
      elId: "",
      option: null,
      chartObj: null
    };
  },

  created() {
    this.elId = uuidv1();     //获取随机id
  },

  mounted() {
       this.option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ['product', '2015', '2016', '2017'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1]
                ]
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
       },
       
       this.chartObj = echarts.init(document.getElementById(this.elId));
       this.chartObj.setOption(this.option);
    }
}
</script>
<style scoped>
.container {
  width: 700px;
  height: 308px;
  vertical-align: middle;
  display: inline-block;
}
</style>