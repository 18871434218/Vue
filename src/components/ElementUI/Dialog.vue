<template>
  <div id="Dialog">
    <el-button type="primary" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-row>
           <el-col :span="12"> 
              <el-input placeholder="请输入名字" v-model="new_name" id="Input_name" @focus="change2"  clearable></el-input>
           </el-col>
           <el-col :span="12">
              <span id="noteMsg">{{notesMseg}}</span>
          </el-col>
        </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="change1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notesMseg: '请输入有效名称', 
      dialogFormVisible: false,
      new_name: ''
    };
  },

  methods:{
      change1(){
          var noteMsg = document.getElementById("noteMsg");
          if(this.new_name === "1234567"){
                noteMsg.innerText = "命名正确";
                this.dialogFormVisible = false; 
          }else{
               noteMsg.innerText = "命名冲突";
          }  
      },
      change2(){
          var noteMsg = document.getElementById("noteMsg");
          noteMsg.innerText = "请输入有效名称";
      }
   }
};
</script>
<style scoped>
</style>