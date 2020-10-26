const client = require('../util/mqtt-client.js').client

// 1. 接收后端发过来的数据
// eslint-disable-next-line no-unused-vars
var backToCarData = null
let backToCar = 'testProject/backToCar/baseState'
client.once('connect', (pkt) => {
    client.subscribe(backToCar)
})
client.on('message', (topic, payload) => {
    if (backToCar === topic) {
        backToCarData = JSON.parse(payload)
    }
})

// 2 传任务车辆完成标注数据给后端
const toBack = 'testProject/carToBack/baseState'
let toBackData = {
    flag: '完成'
}
client.once('connect', () => {
    client.publish(toBack, JSON.stringify(toBackData), (error, packet) => {
        if (error) console.log(error)
        if (packet) console.log(packet)
    })
})
