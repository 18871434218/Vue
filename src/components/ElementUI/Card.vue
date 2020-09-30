<template>
    <div>
        <el-card class="box-card" shadow="hover">
             <!-- slot设置头部区域 -->
            <div slot="header" class="clearfix">   
                <span>卡片名称</span>
                <el-button type="text" style="float: right">操作按钮</el-button>
            </div>
            <div v-for="(item, index) in showRecord" :key="index" class="text item">
                {{item}}
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showRecord: ['nisfd','sfds','nisfppppd','nisssfd','nisssfd','nisssfd']      // 对象数组
        }
    }
}
</script>
<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    height: 200px;
    width: 600px;
    /* 高度不够就出现滑动 */
    overflow: auto;   
}
</style>