const { roadNet } = require('../service/road-net/roadnet-iomap');
const { getRoadmap, parseRoadNetData } = require('./road-get-update');
const { client } = require('../util/mqtt-client');
const { logger } = require('../util/logger.js');
const { client: mqttClient } = require('../util/mqtt-client');

async function onlySetDeviceStatus(ctx, next) {
    const logger1 = logger.scope('onlySetDeviceStatus');
    try {
        const node = ctx.request.body.node;
        const isFull = ctx.request.body.state;
        const roadMap = ctx.request.body.roadMap;
        await roadNet(roadMap).setbit(node, isFull);
        const roadData = await getRoadmap('all');
        if (roadData === false) {
            logger1.error('修改设备状态成功之后，再获取最新路网失败');
            const desErr = '修改设备状态成功之后，再获取最新路网失败';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202122', time: new Date(), func: 'onlySetDeviceStatus', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: '修改设备状态成功之后，再获取最新路网失败' };
        } else {
            logger1.info('修改设备状态成功之后，获取最新路网成功, MQTT发送给前端');
            const roadMapData = await parseRoadNetData(roadData);
            client.publish('optics/roadNetData', JSON.stringify(roadMapData), { qos: 0, retain: false });
            ctx.body = { code: 200, message: '修改设备状态成功之后，获取最新路网成功, MQTT发送给前端' };
        }
    } catch (err) {
        logger1.fatal('onlySetDeviceStatus', err);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302123', time: new Date(), func: 'onlySetDeviceStatus', desc: 'Unknown fatal.', detail: err }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fatal error 404' + err };
    }
}

module.exports = { 'POST /api/onlySetDeviceStatus': onlySetDeviceStatus };
