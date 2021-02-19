const { logger } = require('../util/logger.js');
const { client } = require('../util/mqtt-client');
const { getRoadmap, updateRoadmap, parseRoadNetData } = require('./road-get-update');
const { client: mqttClient } = require('../util/mqtt-client');
const { initRoadNet } = require('../service/road-net/roadnet-iomap-init');

// 拉取路网数据
async function getRoadNet(ctx, next) {
    const logger1 = logger.scope('getRoadNet');
    try {
        const roadList = ctx.request.body.range;
        logger1.info('请求字段', roadList);
        const roadMapData = await getRoadmap(roadList);
        if (roadMapData === false) {
            logger1.error('gRPC返回 no roadMap');
            const desErr = 'gRPC返回 no roadMap';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202124', time: new Date(), func: 'getRoadNet', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, value: 'no roadMap' };
        } else {
            await initRoadNet();
            const toFrontRoadData = await parseRoadNetData(roadMapData);
            logger1.info('gRPC返回 路网数据成功');
            ctx.body = { code: 200, value: toFrontRoadData };
        }
    } catch (error) {
        logger1.fatal('fatel' + error);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302125', time: new Date(), func: 'getRoadNet', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 400, value: 'fatel' + error };
    }
};

// 修改路网数据
async function setRoadNet(ctx, next) {
    const logger1 = logger.scope('setRoadNet');
    try {
        const allParameter = ctx.request.body;
        const conent = {
            roadmap: allParameter.roadmap, // 路网名称
            request_type: allParameter.request_type, // 修改路网类型：lane或者node
            request_id: allParameter.request_id, // 对应的id
            state: allParameter.state // 对应的free或者blocked
        };
        logger1.info('请求数据', conent);
        const responseData = await updateRoadmap(conent);
        logger1.debug('gRPC返回', responseData);
        if (responseData.code === 200) {
            logger1.info('更新路网成功', responseData.message);
            ctx.body = { code: 200, message: responseData.message };
            const roadGrpc = await getRoadmap('all');
            if (roadGrpc === false) {
                logger1.error('更新路网成功之后，再获取最新路网失败');
                const word = '更新路网成功之后，再获取最新路网失败';
                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202126', time: new Date(), func: 'setRoadNet', desc: word, detail: word }), { qos: 0, retain: false });
            } else {
                logger1.info('更新路网成功之后，获取最新路网成功, MQTT发送给前端');
                const roadMapData = await parseRoadNetData(roadGrpc);
                client.publish('optics/roadNetData', JSON.stringify(roadMapData), { qos: 0, retain: false });
            }
        } else {
            logger1.error('更新路网失败', responseData.message);
            const word = '更新路网失败';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202127', time: new Date(), func: 'setRoadNet', desc: word, detail: word }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: responseData.message };
        }
    } catch (error) {
        logger1.fatal('修改路网fatel错误' + error);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202128', time: new Date(), func: 'getRoadNet', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fatel' + error };
    }
};

module.exports = {
    'POST /api/getRoadNet': getRoadNet,
    'POST /api/setRoadNet': setRoadNet
};
