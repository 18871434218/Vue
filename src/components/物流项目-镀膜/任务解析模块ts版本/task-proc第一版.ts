import { manager as carManager } from '../service/vehicle-center/manage';
import { missionManager } from '../service/mission-center/task-manager';
import { manager } from '../service/mission-data/manager';
import { handCheck } from '../service/car-mission/mission-apis';
import { checkTasklist, checkTask, checkHandCheckField } from './validate';
import { logger } from '../util/logger'
import { report } from '../util/reporter';
import { newParseTask, storeTodb, queryCurNodeAndTaskType } from '../service/mission-center/task-parse';

const taskGeneration = async(ctx: any, next: any) => {
    const logger1 = logger.scope('taskGeneration');
    try {
        const allTask = ctx.request.body;
        const flag = await checkTasklist(allTask);
        logger1.debug('字段检验结果', flag);
        if (flag === true) {
            const num = allTask.length;
            ctx.body = { code: 200, message: `received ${num} field` };
            for (const clusterTask of allTask) {
                const { repeat, mission } = await newParseTask(clusterTask);
                await storeTodb(repeat, mission);
            }
        } else {
            report({ code: '302107', func: 'taskGeneration', desc: 'task field error', detail: flag });
            ctx.body = { code: 400, message: flag };
            for (const clusterTask of allTask) {
                if ((await checkTask(clusterTask)) === true) {
                    const { repeat, mission } = await newParseTask(clusterTask);
                    await storeTodb(repeat, mission);
                } else {
                    continue;
                }
            }
        }
    } catch (err) {
        logger1.fatal(err);
        report({ code: '302108', func: 'taskGeneration', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: '404 fatal error' + err };
    }
};

// people to confirm task completion
const handCheckOver = async(ctx: any, next: any) => {
    const logger1 = logger.scope('handCheckOver');
    try {
        const handCheckData = ctx.request.body;
        const flag = await checkHandCheckField(handCheckData);
        if (flag === 1) {
            const desErr = 'missing field in the input parameters';
            logger1.error(desErr);
            report({ code: '202110', func: 'handCheckOver', desc: desErr, detail: desErr });
            ctx.body = { code: 400, message: desErr };
        } else if (flag === 2) {
            const desErr = 'the type of the input parameter is not right';
            logger1.error(desErr);
            report({ code: '202111', func: 'handCheckOver', desc: desErr, detail: desErr });
            ctx.body = { code: 400, message: desErr };
        } else {
            const taskIdFromFron = handCheckData.taskId;
            const currentNodeFromFron = handCheckData.currentNode;
            const boxStatus = handCheckData.status;
            if (boxStatus === 1) {
                const currentCheckMission = await missionManager.query(taskIdFromFron);
                let getTaskFinishResponse = null;
                if (currentCheckMission !== null) {
                    const queryData = await queryCurNodeAndTaskType(currentCheckMission);
                    const currentTaskType = queryData.currentTaskType;
                    const currentNode = queryData.currentNode;
                    if (currentTaskType === 'coating') {
                        if (currentNodeFromFron === currentNode) {
                            getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            if (getTaskFinishResponse.code === 200) {
                                logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            } else {
                                const desErr = 'handCkeck interface' + getTaskFinishResponse.message;
                                logger1.warn(desErr);
                                report({ code: '302113', func: 'handCheckOver', desc: desErr, detail: desErr });
                                ctx.body = { code: 400, message: desErr };
                            }
                        } else {
                            const desErr = 'currenNode is not right';
                            logger1.warn(desErr);
                            report({ code: '302114', func: 'handCheckOver', desc: desErr, detail: desErr });
                            ctx.body = { code: 400, message: desErr };
                        }
                    } else {
                        if (currentNodeFromFron === currentNode) {
                            getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            if (getTaskFinishResponse.code === 200) {
                                logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            } else {
                                const desErr = 'handCkeck interface' + getTaskFinishResponse.message;
                                logger1.warn(desErr);
                                report({ code: '302115', func: 'handCheckOver', desc: desErr, detail: desErr });
                                ctx.body = { code: 400, message: desErr };
                            }
                        } else {
                            const desErr = 'currentNode is not right';
                            logger1.warn(desErr);
                            report({ code: '302116', func: 'handCheckOver', desc: desErr, detail: desErr });
                            ctx.body = { code: 400, message: desErr };
                        }
                    }
                } else {
                    const desErr = 'this taskId does not exist';
                    logger1.warn(desErr);
                    report({ code: '302117', func: 'handCheckOver', desc: desErr, detail: desErr });
                    ctx.body = { code: 400, message: 'this taskId does not exist' };
                }
            } else {
                const desErr = 'The box is out of order';
                logger1.warn(desErr);
                report({ code: '302118', func: 'handCheckOver', desc: desErr, detail: desErr });
                ctx.body = { code: 400, message: desErr };
            }
        }
    } catch (err) {
        logger1.fatal('fatal error', err);
        report({ code: '302119', func: 'handCheckOver', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: 'fatal error ' + err };
    }
};

async function removePendingTask(ctx: any, next: any) {
    const logger1 = logger.scope('removePendingTask');
    try {
        const { taskId } = ctx.request.body;
        const result = await manager.remove({ key: taskId, set: 'pending' });
        ctx.body = result ? { code: 200, message: 'success' } : { code: 400, message: 'fail' };
    } catch (error) {
        logger1.fatal('fatal error', error);
        report({ code: '305134', func: 'removePendingTask', desc: 'Unknown fatal.', detail: error });
        ctx.body = { code: 400, message: 'fail' };
    }
};

async function realTimeWeight(ctx: any, next: any) {
    const logger1 = logger.scope('realTimeWeight');
    try {
        const { taskId } = ctx.request.body;
        const { value: mdata } = await manager.query({ key: taskId });
        if (mdata) {
            const result = { taskId: '', carId: '', weight: 0 };
            result.taskId = mdata.taskId;
            result.carId = mdata.content[mdata.stepIndex].carId;
            const { value: carInfo } = await carManager.queryALL(result.carId);
            result.weight = carInfo ? carInfo.agvStatus.weight : 0;
            ctx.body = { code: 200, message: result };
        } else {
            logger1.warn('fail');
            report({ code: '105132', func: 'realTimeWeight', desc: 'fail', detail: 'fail' });
            ctx.body = { code: 400, message: 'fail' };
        }
    } catch (err) {
        logger1.fatal('fail' + err);
        report({ code: '105133', func: 'realTimeWeight', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: 'fail' };
    }
};

module.exports = {
    'POST /api/optics/mission/taskGeneration': taskGeneration,
    'POST /api/optics/mission/handCheckOver': handCheckOver,
    'POST /api/optics/mission/terminateTask': removePendingTask,
    'POST /api/optics/mission/realTimeWeight': realTimeWeight
};
