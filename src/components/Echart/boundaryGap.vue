<template>
<!-- 就这个动态加载数据，其他的图表都不是动态的 -->
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
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
               backgroundColor: '#283b56'
          }
        },
      },
      
      legend: {
        data: ['最新成交价', '预购队列']
      },
      
      toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
         }  
      },

      dataZoom: {
          show: false,
          start: 0,
          end: 100
      },

       xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                    now = new Date(now - 2000);
                }
                return res;
            })()
        },
        {
            type: 'category',
            boundaryGap: true,
            data: (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(10 - len - 1);
                }
                return res;
            })()
         }
     ],
      
       yAxis: [
        {
            type: 'value',
            scale: true,
            name: '价格',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '预购量',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
         }
      ],
    
      series: [
         {
            name: '预购队列',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function (){
                var res = [];
                var len = 10;
                while (len--) {
                    res.push(Math.round(Math.random() * 1000));
                }
                return res;
            })()
         },
         {
            name: '最新成交价',
            type: 'line',
            data: (function (){
                var res = [];
                var len = 0;
                while (len < 10) {
                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
                    len++;
                }
                  return res;
              })()
           }
        ]
    };

    setInterval(this.setTime, 2100);
   },

   methods: {
        setTime(){
                var count = 11;
                var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

                var data0 = this.option.series[0].data;
                var data1 = this.option.series[1].data;

                data0.shift();
                data0.push(Math.round(Math.random() * 1000));
                data1.shift();
                data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

                this.option.xAxis[0].data.shift();
                this.option.xAxis[0].data.push(axisData);
                this.option.xAxis[1].data.shift();
                this.option.xAxis[1].data.push(count++);

                this.chartObj = echarts.init(document.getElementById(this.elId));
                this.chartObj.setOption(this.option);
         }
    }
};
</script>

<style scoped>
.container {
  width: 700px;
  height: 308px;
  vertical-align: middle;
  display: inline-block;
}
</style>