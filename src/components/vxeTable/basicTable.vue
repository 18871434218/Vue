<template>
    <div>
        <vxe-form>
            <vxe-form-item title="选择设备">
                <template v-slot>
                    <vxe-select placeholder="请选择设备ID" v-model="selectDeviceId">
                        <vxe-option v-for="(item, index) in tableData" :key="index" :label="item.id" :value="item.id"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-form-item>
            <vxe-form-item title="任务状态">
                 <template v-slot>
                    <vxe-select placeholder="请选择状态" v-model="selectTaskStatus">
                        <vxe-option v-for="(item, index) in tableData" :key="index" :label="item.taskStatus" :value="item.taskStatus"></vxe-option>
                    </vxe-select>
                 </template>
            </vxe-form-item>
            <vxe-form-item>
                <template v-slot>
                    <vxe-button @click="clearData()">清空</vxe-button>
                </template>
            </vxe-form-item>
        </vxe-form>

        <vxe-table
           hightlight-hover-row
           border
           round
           height="300"
           align="center"
           :data="tableData"
           style="width:650px;"
           >
            <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
            <vxe-table-column field="id" title="设备ID"></vxe-table-column>
            <vxe-table-column field="start" title="起点"></vxe-table-column>
            <vxe-table-column field="end" title="终点"></vxe-table-column>
            <vxe-table-column field="taskType" title="任务类型"></vxe-table-column>
            <vxe-table-column field="taskStatus" title="任务状态"></vxe-table-column>
            <vxe-table-column field="currentPosition" title="当前位置"></vxe-table-column>
            <vxe-table-column field="taskTime" title="任务时间"></vxe-table-column>
        </vxe-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectDeviceId: null,
            selectTaskStatus: null,
            tableData: [
                { id: 10001, start: '1', end: '3', taskStatus: '进行中', taskType: '取货', taskTime: '60 minite' },
                { id: 10002, start: '1', end: '6', taskStatus: '已完成', taskType: '放货', taskTime: '60 minite' },
                { id: 10002, start: '2', end: '5', taskStatus: '已完成', taskType: '取货', taskTime: '60 minite' },
                { id: 10003, start: '3', end: '5', taskStatus: '进行中', taskType: '放货', taskTime: '60 minite' },
                { id: 10002, start: '2', end: '9', taskStatus: '进行中', taskType: '取货', taskTime: '60 minite' },
                { id: 10004, start: '4', end: '4', taskStatus: '已完成 ', taskType: '放货', taskTime: '60 minite' },
                { id: 10004, start: '4', end: '6', taskStatus: '出错 ', taskType: '取货', taskTime: '60 minite' },
                { id: 10004, start: '5', end: '9', taskStatus: '等待', taskType: '放货', taskTime: '60 minite' }
            ]
        }
    },

    methods: {
        clearData() {
            return 0;
        }
    }

}
</script>
<style scoped>

</style>>