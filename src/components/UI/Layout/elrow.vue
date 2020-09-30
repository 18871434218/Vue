<template>
    <el-row id="elrow">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-circle-plus">删除地图</el-button>
            </div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <el-button plain disabled>朴素按钮</el-button>
                    <el-button type="info" plain disabled autofocus>主要按钮</el-button> 
                </div></el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-button type="primary" :loading="true">加载中</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
               <div class="grid-content bg-purple">
                   <el-link>默认链接</el-link>
                   <el-link type="primary">主要链接</el-link>
                   <el-link type="success">成功链接</el-link>
                   <el-link type="warning">警告链接</el-link>
                   <el-link type="danger">危险链接</el-link>
                   <el-link type="info">信息链接</el-link>
               </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <template>
                        <el-radio v-model="radio" label="1" @change="radioEvent1">选项1</el-radio>
                        <el-radio v-model="radio" label="2" @change="radioEvent2">选项2</el-radio>
                    </template>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
    </el-row>
</template>
<script>
export default {
    data(){
        return{
            radio: '',
        }
    },
    methods:{
        radioEvent1: function(){
            console.log("Event1", this.radio);
        },
        radioEvent2: function(){
            console.log("Event2", this.radio)
        }
    }
}
</script>
<style scoped>
 ::v-deep .el-row {
    margin-bottom: 20px;
  }
/* ::v-deep .el-col {
    border-radius: 4px;
  }
::v-deep .bg-purple-dark {
    background: #99a9bf;
     min-height: 36px;
  }
::v-deep .bg-purple {
    background: #d3dce6;
     min-height: 36px;
  }
::v-deep .bg-purple-light {
    background: #e5e9f2;
     min-height: 36px;
  }
::v-deep .grid-content {
    border-radius: 4px;
    min-height: 36px;
  } */
</style>