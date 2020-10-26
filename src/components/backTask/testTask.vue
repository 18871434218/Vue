<template>
    <div>
        <el-button @click="postBack">查询</el-button>
        <div>{{ message }}</div>
        <el-button @click="postCar">确认完成任务</el-button>
        <div>{{ finishFlag }}</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
           message: null,
           finishFlag: null
        }
    },
    methods: {
        postBack: function () {
            const postData = {
                goodsNumber: 12,
                currentLocation: [120, 130]
            }
            const url = '/api/optics/mission/generation'
            this.$http.post(url, postData).then(response => {
                if (response.status !== 200) {
                    console.log('失败')
                } else {
                    console.log('成功')
                    this.message = response.data
                }
            })
        },
        postCar: function () {
             const postFinish = {
                 endFlag: 1,
                 clientId: 'ni90',
                 carId: 'ni78',
                 currentLocation: [12, 56]
             }
             const url = '/api/optics/mission/Finish'
             this.$http.post(url, postFinish).then(response => {
                 if (response.status !== 200) {
                     console.log('失败')
                 } else {
                     console.log('任务确认完成')
                     this.finishFlag = response.data
                 }
             })
        }
    }
}
</script>
