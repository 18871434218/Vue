<template>
  <div id="Select">
    <el-row>
       <el-col :span="12">
          <el-select v-model="value1" @change="Selectchange1" placeholder="请选择">
            <el-option
                v-for="(item, index) in options"
                :key="item.value"
                :label="item.label"
                :value="index"
                :disabled="item.disabled">
            </el-option>
          </el-select>
       </el-col>
       <el-col :span="12">
          <el-select v-model="value2"  @change="Selectchange2" placeholder="请选择">
            <el-option
                v-for="(item, index) in options"
                :key="item.value"
                :label="item.label"
                :value="index"
                :disabled="item.disabled">
            </el-option>
          </el-select>
       </el-col>   
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕',
        }, {
          value: '选项2',
          label: '双皮奶',
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],

        value1: '',
        value2: '',

        Selectindex1: 0,
        Selectindex2: 0
      }
    },

    methods:{
          Selectchange1(value){
              this.options[value].disabled = true;
              this.Selectindex1 = value;
           },

          changeblur1(){
               this.options[this.Selectindex2].disabled = false;
               this.options[this.Selectindex1].disabled = false;
          },

          Selectchange2(value){
              this.options[value].disabled = true;
              this.Selectindex2 = value;
          },

          changeFous2(){
              this.options[this.Selectindex2].disabled = false;
              this.options[this.Selectindex1].disabled = false; 
          },
      }
  }
</script>