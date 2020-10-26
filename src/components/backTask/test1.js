<template>
    <div>
        <el-button @click="postBack">查询</el-button>
        <div>{{ message }}</div>
        <el-button @click="postCar">确认完成任务</el-button>
        <div>{{ mqttData }}</div>
    </div>
</template>
<script>
import mqtt from 'mqtt'
export default {
    data () {
        return {
           message: null,
        //    finishFlag: null,
           client: null,
           mqttData: null
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
                 clientId: 'ni90'
             }
             const url = '/api/optics/mission/Finish'
             this.$http.post(url, postFinish).then(response => {
                 if (response.status !== 200) {
                     console.log('失败')
                 } else {
                     console.log('任务确认完成')
                    //  this.finishFlag = response.data
                 }
             })
        }
    },
    mounted () {
      const options = {
        connectTimeout: 4000,
        clientId: 'mqtitId-_client_monitor',
        clean: true,
        keepAliveInterval: 5000
    }
    let backTopic = 'testProject/backToClient/baseState'

    this.client = mqtt.connect('wss://www.sunnyiov.com/mqtt', options)
    this.client.subscribe(backTopic, { qos: 1 }, (err, granted) => {
        if (err) console.log('----', err)
        else console.log(granted)
    })

    this.client.on('message', (topic, message) => {
        message = JSON.parse(message.toString())
        if (topic === backTopic) {
            this.mqttData = message
        }
    })

    this.client.on('reconnect', error => {
        console.log('正在重连：', error)
      })

    this.client.on('error', error => {
      console.log('连接失败', error)
    })
    }
}
</script>
