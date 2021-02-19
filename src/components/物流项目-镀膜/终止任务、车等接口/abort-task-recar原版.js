const { manager: missManager } = require('../service/mission-data/manager');
const { manager: carManager } = require('../service/vehicle-center/manage');
const { logger } = require('../util/logger.js');
const { postTaskData: resetMission } = require('../service/mission-data/task-monitor');
const { client: mqttClient } = require('../util/mqtt-client');

const abortTask = async(ctx, next) => {
    const logger1 = logger.scope('abortTask');
    try {
        const taskId = ctx.request.body.taskId;
        const mission = await missManager.query({ key: taskId });
        if (mission === null) {
            logger1.warn('this taskId does not exist');
            const desErr = 'this taskId does not exist';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102104', time: new Date(), func: 'abortTask', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'this taskId does not exist' };
        } else {
            const mvalue = mission.value;
            const stepIndex = mvalue.stepIndex;
            const taskId = mvalue.taskId;
            const content = mvalue.content[stepIndex];
            const roadNodes = content.roadNodes;
            const carId = content.carId;
            let nodeIndex = content.nodesIndex;
            if (nodeIndex === roadNodes.length - 1) {
                logger1.warn('currentTask is is running on the conveyor belt');
                const desErr = 'currentTask is is running on the conveyor belt';
                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102105', time: new Date(), func: 'abortTask', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                ctx.body = { code: 400, message: 'currentTask is is running on the conveyor belt' };
            } else {
                nodeIndex = nodeIndex + 1;
            }
            const repeatIndex = content.repeatIndex;
            const temp = {
                taskId: taskId,
                carId: carId,
                contentIndex: nodeIndex,
                stepIndex: stepIndex,
                repeatIndex: repeatIndex,
                error: true,
                message: 'The car broke down at the current point and stopped at the current point'
            };
            await resetMission(temp);
            logger1.info('clear task success');
            ctx.body = { code: 200, message: 'success' };
        }
    } catch (error) {
        logger1.fatal('fatal error');
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302106', time: new Date(), func: 'abortTask', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 404, message: error + '404 fatal error' };
    }
};

const recoveryCar = async(ctx, next) => {
    const logger1 = logger.scope('recoveryCar');
    try {
        const carId = ctx.request.body.carId;
        const carAllData = await carManager.queryALL(carId);
        if (carAllData === null) {
            logger1.warn('this carId does not exist');
            const word = 'this carId does not exist';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102101', time: new Date(), func: 'recoveryCar', desc: word, detail: word }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'this carId does not exist' };
        } else {
            const carStatus = carAllData.state;
            if (carStatus === 'busy') {
                carAllData.state = 'idle';
                await carManager.update(carAllData);
                logger1.info('restore the car to idle');
                ctx.body = { code: 200, message: 'restore the car to idle' };
            } else if (carStatus === 'idle') {
                logger1.info('the car is already idle');
                ctx.body = { code: 200, message: 'the car is already idle' };
            } else if (carStatus === 'error') {
                carAllData.state = 'idle';
                await carManager.update(carAllData);
                logger1.info('restore error  the car to idle');
                ctx.body = { code: 200, message: 'restore the error car to idle' };
            } else {
                logger1.warn('the car is offline');
                const word = 'the car is offline';
                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102102', time: new Date(), func: 'recoveryCar', desc: word, detail: word }), { qos: 0, retain: false });
                ctx.body = { code: 400, message: 'the car is offline' };
            }
        }
    } catch (error) {
        logger1.fatal('404 fatal error');
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302103', time: new Date(), func: 'recoveryCar', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 404, message: error + '404 fatal error' };
    }
};

module.exports = {
    'POST /api/optics/abortTask': abortTask,
    'POST /api/optics/recoveryCar': recoveryCar
};
