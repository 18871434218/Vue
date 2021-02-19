// const { manager } = require('../service/mission-data/manager');
const { roadNet } = require('../service/road-net/roadnet-iomap');
const { getRoadmap, parseRoadNetData } = require('./road-get-update');
const { client } = require('../util/mqtt-client');
const { logger } = require('../util/logger.js');
const { client: mqttClient } = require('../util/mqtt-client');

async function setStateSunny(ctx, next) {
    const logger1 = logger.scope('setStateSunny');
    try {
        let isFull = -1;
        const isNormal = ctx.request.body.isNormal;
        if (isNormal === true) {
            const node = ctx.request.body.node;
            if (ctx.request.body.isFull === true) {
                isFull = 1;
            } else {
                isFull = 0;
            }
            await roadNet(ctx.request.body.area).setbit(node, isFull);
            logger1.info('修改节点状态成功');
            await getRoadPulish();
            ctx.body = { code: 200, message: 'success' };
        } else {
            logger1.error('修改节点状态失败，光学公司发送的是错误信息');
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '203017', time: new Date(), func: 'setStateSunny', desc: '修改节点状态失败，光学公司发送的是错误信息', detail: '修改节点状态失败，光学公司发送的是错误信息' }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'fail' };
        }
    } catch (error) {
        logger1.fatal('setStateSunny:' + error);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '303018', time: new Date(), func: 'setStateSunny', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fail' };
    }
}

async function getRoadPulish() {
    const logger1 = logger.scope('getRoadPulish');
    try {
        const roadData = await getRoadmap('all');
        if (roadData === false) {
            logger1.error('修改设备状态成功之后，再获取最新路网失败');
            const desErr = '修改设备状态成功之后，再获取最新路网失败';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202400', time: new Date(), func: 'getRoadPulish', desc: desErr, detail: desErr }), { qos: 0, retain: false });
        } else {
            logger1.info('修改设备状态成功之后，获取最新路网成功, MQTT发送给前端');
            const roadMapData = await parseRoadNetData(roadData);
            client.publish('optics/roadNetData', JSON.stringify(roadMapData), { qos: 0, retain: false });
        }
    } catch (err) {
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302404', time: new Date(), func: 'getRoadPulish', desc: 'Unknown fatal.', detail: err }), { qos: 0, retain: false });
        logger1.fatal('getRoadPulish', err);
    }
}

module.exports = { 'POST /api/setStateSunny': setStateSunny };
