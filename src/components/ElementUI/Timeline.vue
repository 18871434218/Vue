<template>
  <div class="block">
    <el-timeline :reverse="reverse">
       <el-timeline-item type="success" v-for="(item, index) in msg" :key="index" >
           <el-card>
               <h4>{{item.updateData}}</h4>
               <p>{{item.note}}</p>
           </el-card>
      </el-timeline-item> 
    </el-timeline>

    <el-timeline :reverse="reverse">
      <el-timeline-item v-for="(item, index) in msg" :key="index">
            <h4>{{item.updateData}}</h4>
            <p>{{item.note}}</p>
            <!-- <template slot="scope">
              {{scope.note}}
            </template> -->
      </el-timeline-item>
    </el-timeline> 

    <!-- <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2018/4/3" placement="bottom">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
        <template :slot="Task">
          {{ Task.name }} 
        </template>
      </el-timeline-item>

      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline> -->
  </div>
</template>
<script>
export default {
    data(){
        return {
            reverse: true,
            msg: [
                {note: '你是1', updateData:'更新1一版本'},
                {note: '你是2', updateData:'更新2一版本'},
                {note: '你是3', updateData:'更新3一版本'},
                {note: '你是4', updateData:'更新4一版本'}     
            ]
        }
    }
};
</script>

<style scoped>
</style>