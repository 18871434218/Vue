import { roadNet } from '../service/road-net/roadnet-iomap';
import { getRoadmap, parseRoadNetData } from './road-get-update';
import { client } from '../util/mqtt-client';
import { logger } from '../util/logger';
import { report } from '../util/reporter';

async function onlySetDeviceStatus(ctx: any, next: any) {
    const logger1 = logger.scope('onlySetDeviceStatus');
    try {
        const node = ctx.request.body.node;
        const isFull = ctx.request.body.state;
        const roadMap = ctx.request.body.roadMap;
        await roadNet(roadMap).setbit(node, isFull);
        const roadData = await getRoadmap('all');
        if (roadData === false) {
            const desErr = '修改设备状态成功之后，再获取最新路网失败';
            logger1.error(desErr);
            report({ code: '202122', func: 'onlySetDeviceStatus', desc: desErr, detail: desErr });
            ctx.body = { code: 400, message: desErr };
        } else {
            logger1.info('修改设备状态成功之后，获取最新路网成功, MQTT发送给前端');
            const roadMapData = await parseRoadNetData(roadData);
            client.publish('optics/roadNetData', JSON.stringify(roadMapData), { qos: 0, retain: false });
            ctx.body = { code: 200, message: '修改设备状态成功之后，获取最新路网成功, MQTT发送给前端' };
        }
    } catch (err) {
        logger1.fatal('onlySetDeviceStatus', err);
        report({ code: '302123', func: 'onlySetDeviceStatus', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: 'fatal error 404' + err };
    }
}

module.exports = { 'POST /api/onlySetDeviceStatus': onlySetDeviceStatus };
