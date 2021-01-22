<template>
  <div>
    <p>原样复制指定文本框内容</p>
    <div class="row">
      <el-button class="copyBtnAB" @click="copycotingAB" :data-clipboard-text="JSON.stringify(coatingAB, null, 2)">CopyAB</el-button>
      <el-button class="copyBtnBA" @click="copycoatingBA" :data-clipboard-text="JSON.stringify(coatingBA, null, 2)">CopyBA</el-button>
      <el-button class="copyBtnEBTA" @click="copyEBTA" :data-clipboard-text="JSON.stringify(coatingEBTA, null, 2)">CopyEBTA</el-button>
      <el-button class="copyBtnEBTB" @click="copyEBTB" :data-clipboard-text="JSON.stringify(coatingEBTB, null, 2)">CopyEBTB</el-button>
      <el-button class="copyBtnresin" @click="copyresin" :data-clipboard-text="JSON.stringify(resin, null, 2)">Copyresin</el-button>
      <el-button class="copyBtnassemblage" @click="copyassemblage" :data-clipboard-text="JSON.stringify(assemblage, null, 2)">Copyassemblage</el-button>
    </div>
    <el-input type="textarea" placeholder="请输入任务数据" v-model="defaultTask" :autosize="{ minRows: 30, maxRows: 100}"></el-input>
    <el-button @click="toPostTaskList" type="primary">确认发送任务</el-button>
    <el-card>
      <div slot="header" class="clearfix">
         <span>任务数据模板</span>
      </div>
      <div><pre>{{taskData}}</pre></div>
    </el-card>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
import { coatingAB, coatingBA, coatingEBTA, coatingEBTB, resin, assemblage } from '../TestFunction/test.json'
export default {
  data() {
    return {
      taskData: 
      [
         {
            taskId: '20DFDFJYWYYY',  // 任务ID(唯一)'
            taskType: 'coating', // 任务类型
            preTaskId: '0', //上一个任务ID
            boxId: 'boxid1', // 箱子ID
            content: [ // 任务类型
                {   
                    area: 'A',
                    roadNodes: [ // 该区域需要执行任务的路网节点
                        {
                            node: 1, // 节点序号
                            todo: { // 执行指令
                                type: 'LIFT',  
                                action: 11, // 1：取货 2：放货
                                target: 1, // 1：货架1层  2: 货架2层  3：货架3层  4：传送带
                                direction: 1, // 1：左方向   2：右方向
                                endLevel: 0 // 动作结束的判断等级   0：机器自动判断结束   1：必须由操作人员扫码判定结束
                            },
                            goods: { // 货物属性
                                type: 0, // 货物类型
                                weight: 0 // 货物重量
                            }
                        }
                    ],
                    repeat: 1 // 该区域此指令执行的重复次数
                },
                {
                    area: 'B',
                    roadNodes: [
                        {
                            node: 3,
                            todo: {
                                type: 'LIFT',
                                action: 12,
                                target: 1,
                                direction: 1,
                                endLevel: 0
                            },
                            goods: {
                                type: 0,
                                weight: 0
                            }
                        }
                    ],
                    repeat: 1
                }
            ]
        }
      ],
      coatingAB,
      coatingBA,
      coatingEBTA,
      coatingEBTB,
      resin,
      assemblage,
      defaultTask: null
    }
  },
  methods: {
      copycotingAB: function(e) {
          console.log('111', e);
          var clipboard = new Clipboard('.copyBtnAB');
          clipboard.on('success', e => {
              // this.defaultTask = ;
              this.defaultTask = JSON.stringify(coatingAB, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },
    
       copycoatingBA: function() {
          var clipboard = new Clipboard('.copyBtnBA');
          console.log('BA', this.coatingBA);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(coatingBA, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },

       copyEBTA: function() {
          var clipboard = new Clipboard('.copyBtnEBTA');
          console.log('EBTA', this.coatingEBTA);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(coatingEBTA, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },

       copyEBTB: function() {
          var clipboard = new Clipboard('.copyBtnEBTB');
          console.log('EBTB', this.coatingEBTB);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(coatingEBTB, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },

       copyresin: function() {
          var clipboard = new Clipboard('.copyBtnresin');
          console.log('resin', this.resin);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(resin, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },

       copyassemblage: function() {
          var clipboard = new Clipboard('.copyBtnassemblage');
          console.log('assemblage', this.assemblage);
          clipboard.on('success', e => {
              this.defaultTask = JSON.stringify(assemblage, null, 2)
              this.$message({
                  message: '已复制到粘贴板' + e,
                  showClose: true,
                  type: 'success'
              })
              clipboard.destroy();
          })

          clipboard.on('error', e => {
              this.$message({ 
                  message: '复制失败' + e,
                  showClose: true, 
                  type: 'error'
                });
              clipboard.destroy();
          })
       },

       toPostTaskList: function() {
         console.log('发送任务数据', this.defaultTask);
       }
    }
};
</script>
<style>

</style>