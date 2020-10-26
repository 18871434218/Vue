const axios = require('axios')
const client = require('../util/mqtt-client.js').clinet

const missionGeneration = async (ctx, next) => {
    const goodsNumber = ctx.request.body.goodsNumber // 货号
    const currentLocation = ctx.request.body.currentLocation // 当前位置

    const data = {
        goods: goodsNumber,
        location: currentLocation
    }

    await axios.post('http://127.0.0.1:3333/api/optics/InformationCenter', data)
    .then((res) => {
        // let TaskInformation = res.data + 'datatat' + data;                               // 调用信息平台接口返回任务查询数据
        ctx.rest(JSON.stringify({
            send: data,
            received: res.data
        }, undefined, 2))
    }).catch((err) => {
        console.log(err)
    })
}

const missionFinish = async (ctx, next) => {
     // 1  解析前端 "确认" 数据
     const endLevel = ctx.request.body.endFlag
     const clientId = ctx.request.body.clientId
     const currentLocation = ctx.request.body.currentLocation

     const toCarInfo = {
         level: endLevel,
         clientid: clientId,
         location: currentLocation
     }

     console.log('-----', toCarInfo)

     // 2 mqtt发布数据给车端
     const topicToCar = 'testProject/backToCar/baseState'
     await client.once('connect', () => {
         client.publish(topicToCar, JSON.stringify(topicToCar), (error, packet) => {
             if (error) console.log(error)
             if (packet) console.log(packet)
         })
     })

     // 3 mqtt订阅车返回的数据消息
     let carData = null
     const carToTopic = 'testProject/carToBack/baseState'
     client.once('connect', (pkt) => {
         client.subscribe(carToTopic)
     })
     client.on('message', (topic, payload) => {
         if (carToTopic === topic) {
             carData = JSON.parse(payload)
         }
     })

     // 4 把返回消息发给前端
     const toFrontTopic = 'testProject/backToClient/baseState'
     client.once('connect', () => {
        client.publish(toFrontTopic, JSON.stringify(carData), (error, packet) => {
            if (error) console.log(error)
            if (packet) console.log(packet)
        })
    })

    ctx.body = toCarInfo
}

module.exports = {
    'POST /api/optics/mission/generation': missionGeneration,
    'POST /api/optics/mission/Finish': missionFinish
}
