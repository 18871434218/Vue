const axios = require('axios');
const { createMission, manager } = require('../service/mission-data/manager');
const { manager: carManager } = require('../service/vehicle-center/manage');
const { postTaskPublishTime } = require('../service/mission-data/task-monitor');
const { handCheck } = require('../service/car-mission/mission-apis');
const { checkTasklist, checkTask, checkHandCheckField } = require('./validate');
const { logger } = require('../util/logger.js');
const { devio } = require('../service/device/io-bitmap');
const { client: mqttClient } = require('../util/mqtt-client');

const allTaskOrCheckGeneration = async(ctx, next) => {
    try {
        const primsekey = ctx.request.body.key;
        if (primsekey === '') {
            ctx.body = { code: 200, message: 'key is null, unvalid' };
        } else {
            const postkey = { key: primsekey };
            const allTask = await taskFromInformationCenter(postkey);
            const flag = await checkTasklist(allTask);
            if (flag === true) {
                const num = allTask.length;
                ctx.body = { code: 200, message: `received ${num} field` };
                for (const mission of allTask) {
                    const genrationTask = await newParseTask(mission);
                    await storeToDatabase(genrationTask);
                }
            } else {
                ctx.body = { code: 400, message: flag };
                for (const mission of allTask) {
                    if ((await checkTask(mission)) === true) {
                        const genrationTask = await newParseTask(mission);
                        await storeToDatabase(genrationTask);
                    } else {
                        continue;
                    }
                }
            }
        }
    } catch (err) {
        ctx.body = { code: 400, message: '404 fatal' + err };
    }
};

const taskGeneration = async(ctx, next) => {
    const logger1 = logger.scope('taskGeneration');
    try {
        const allTask = ctx.request.body;
        const flag = await checkTasklist(allTask);
        logger1.debug('字段检验结果', flag);
        if (flag === true) {
            const num = allTask.length;
            ctx.body = { code: 200, message: `received ${num} field` };
            for (const mission of allTask) {
                const genrationTask = await newParseTask(mission);
                await storeToDatabase(genrationTask);
            }
        } else {
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302107', time: new Date(), func: 'handCheckOver', desc: 'task field error', detail: flag }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: flag };
            for (const mission of allTask) {
                if ((await checkTask(mission)) === true) {
                    const genrationTask = await newParseTask(mission);
                    await storeToDatabase(genrationTask);
                } else {
                    continue;
                }
            }
        }
    } catch (err) {
        logger1.fatal(err);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302108', time: new Date(), func: 'handCheckOver', desc: 'Unknown fatal.', detail: err }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: '404 fatal error' + err };
    }
};

const taskFromInformationCenter = function(taskId) {
    return new Promise((resolve, reject) => {
        axios.post('http://10.0.12.253:1619/api/tasks', taskId).then((response) => {
            if (response.status !== 200) {
                reject(response.data);
            } else {
                resolve(response.data);
            }
        });
    });
};

const parseTaskContent = async(content) => {
    const areaMap = [];
    for (const val of content) {
        const roadMap = val.area;
        const roadNodes = val.roadNodes;
        const repeat = val.repeat;
        areaMap.push({ roadMap: roadMap, nodesIndex: -1, roadNodes: roadNodes, repeat: repeat, repeatIndex: 0 });
    }

    return areaMap;
};

const InsertNode = async(content) => {
    const logger1 = logger.scope('InsertNode');
    const insertNodes = [
        {
            node: 4,
            todo: { type: 'LIFT', action: 13, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 5,
            todo: { type: 'LIFT', action: 12, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 7,
            todo: { type: 'LIFT', action: 13, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 6,
            todo: { type: 'LIFT', action: 12, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        }
    ];

    for (let i = 1; i < content.length; i++) {
        if (content[i].roadMap < content[i - 1].roadMap) {
            logger1.info('roadMap B 到roadMap A 插入7和6');
            content[i - 1].roadNodes.push(insertNodes[2]);
            content[i].roadNodes.unshift(insertNodes[3]);
        } else if (content[i].roadMap > content[i - 1].roadMap) {
            logger1.info('roadMap A 到roadMap B 插入4和5');
            content[i - 1].roadNodes.push(insertNodes[0]);
            content[i].roadNodes.unshift(insertNodes[1]);
        } else {
            logger1.info('相同roadMap不插入节点');
            continue;
        }
    }

    return content;
};

const newParseTask = async(mission) => {
    const logger1 = logger.scope('insertEBTANode');
    const taskId = mission.taskId;
    const boxId = mission.boxId;
    const taskType = mission.taskType;
    const preTaskId = mission.preTaskId;
    const stepIndex = 0;
    let taskContent = null;
    const content = await parseTaskContent(mission.content);

    // when taskType is coating, roadNodes need Insert node
    if (taskType === 'coating') {
        if (content.length === 1) {
            // 预处理添加插点，手动endlevel等于1， 待定
              
            taskContent = content;
        } else {
            // 传送带插点要不要，待定  
            taskContent = await InsertNode(content);
        }
    } else if (taskType === 'EBTA') {
        if (content.length === 1 && content[0].roadNodes.length === 2) {
            taskContent = await insertEBTANode(content);
        } else {
            logger1.error('输入数据不符合, 空箱运转只能是一段两个点');
            const desErr = '输入数据不符合, 空箱运转只能是一段两个点';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302109', time: new Date(), func: 'newParseTask', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            throw new Error('输入数据不符合, 空箱运转只能是一段两个点');
        }      
    } else {
        taskContent = content;
    }

    return {
        taskId: taskId,
        preTaskId: preTaskId,
        taskType: taskType,
        boxId: boxId,
        stepIndex: stepIndex,
        content: taskContent
    };
};

const insertEBTANode = async(content) => {
    const logger1 = logger.scope('insertEBTANode');
    const insertNodes = [
        {
            node: 8,
            todo: { type: 'LIFT', action: 13, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 9,
            todo: { type: 'LIFT', action: 12, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        }
    ];
    
    content[0].roadNodes.splice(1, 0, insertNodes[0], insertNodes[1]);
    logger1.info('EBTA插入8，9点成功');
    return content;
}

const storeToDatabase = async(mission) => {
    const logger1 = logger.scope('storeToDatabase');
    // 1.new
    const mdata = createMission();

    // 2.assign
    mdata.key = mission.taskId;
    mdata.schedule = Date.now();
    mdata.value = mission;

    // 3.insert data
    const result = await manager.insert(mdata);
    await postTaskPublishTime(mdata);
    logger1.info('insert', result);
};

// Resin calculated weight
const computerWeight = async(currentCheckMission, currentCarWeight) => {
    const currentMission = currentCheckMission.value;
    const stepIndex = currentMission.stepIndex;
    const currentContent = currentMission.content[stepIndex];
    const nodesIndex = currentContent.nodesIndex;
    const roadNodes = currentContent.roadNodes;
    let allWeight = 0;
    const areaWeight = [];
    for (const area of currentMission.content) {
        let nodeWeight = 0;
        for (const node of area.roadNodes) {
            nodeWeight += node.goods.weight;
        }
        areaWeight.push(nodeWeight);
        allWeight += nodeWeight;
    }
    let currentNodeWeight = 0;
    let nodeStepweight = 0;
    for (let i = 0; i <= nodesIndex; i++) {
        nodeStepweight += roadNodes[i].goods.weight;
    }
    if (stepIndex === 0) {
        currentNodeWeight = nodeStepweight;
    } else {
        for (let j = 0; j < stepIndex; j++) {
            currentNodeWeight += areaWeight[j];
        }
        currentNodeWeight += nodeStepweight;
    }

    // 1、allWeight代表任务所有重量   2、currentNodeWeight代表节点所需重量  3、currentCarWeight代表车实时重量
    const remainWeight = allWeight - currentNodeWeight - currentCarWeight;
    return remainWeight;
};

// const checkFlag = async(stepIndex, stepLength, roadsIndex, roadLength) => {
//     if (stepIndex === stepLength && roadsIndex === roadLength) {
//         return true;
//     } else {
//         return false;
//     }
// };

// query car Ip and currentNode
const queryCurWeightAndCurNodeAndTaskType = async(mission) => {
    const currentCheckMission = mission.value;
    const taskType = currentCheckMission.taskType;
    const stepIndex = currentCheckMission.stepIndex;
    // const content = currentCheckMission.content;
    // const contentLength = content.length - 1;
    const currentContent = currentCheckMission.content[stepIndex];
    const nodesIndexs = currentContent.nodesIndex;
    // const nodesLength = currentContent.roadNodes.length - 1;
    const roadNodes = currentContent.roadNodes[nodesIndexs];
    const currentNodeName = roadNodes.node;
    const endlevel = roadNodes.todo.endLevel;
    // const carId = currentContent.carId;
    // const currentCarWeight = await carManager.queryCurrentWeight(carId);
    // const flag = await checkFlag(stepIndex, contentLength, nodesIndexs, nodesLength);
    return {
        currentTaskType: taskType,
        currentNode: currentNodeName,
        endlevel: endlevel
        // flag: flag
    };
};

// people to confirm task completion
const handCheckOver = async(ctx, next) => {
    const logger1 = logger.scope('handCheckOver');
    try {
        const handCheckData = ctx.request.body;
        const flag = await checkHandCheckField(handCheckData);
        if (flag === 1) {
            logger1.error('missing field in the input parameters');
            const desErr = 'missing field in the input parameters';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202110', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'missing field in the input parameters' };
        } else if (flag === 2) {
            logger1.error('the type of the input parameter is not right');
            const desErr = 'the type of the input parameter is not right'
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '202111', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'the type of the input parameter is not right' };
        } else {
            const taskIdFromFron = handCheckData.taskId;
            const currentNodeFromFron = handCheckData.currentNode;
            const boxStatus = handCheckData.status;
            if (boxStatus === 1) {
                // by taskId----taskData----carId----weight
                const currentCheckMission = await manager.query({ key: taskIdFromFron });
                logger1.info('taskId查询任务数据', currentCheckMission);
                let getTaskFinishResponse = null;
                if (currentCheckMission !== null) {
                    const queryData = await queryCurWeightAndCurNodeAndTaskType(currentCheckMission);
                    logger1.info('查询数据queryData', queryData);
                    const currentTaskType = queryData.currentTaskType;
                    const currentNode = queryData.currentNode;
                    // const flag = queryData.flag;
                    // const currentCarWeight = queryData.currentCarWeight;
                    if (currentTaskType === 'coating') {                                                             // 待定点的endlevel为1做判断
                        if (currentNodeFromFron === currentNode) {
                            // if (flag === true) {
                            //     await devio('optics').setbit(currentNode, 1);
                            //     getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            //     if (getTaskFinishResponse.code === 200) {
                            //         logger1.info('hankCheck interface', getTaskFinishResponse.message);
                            //         ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            //     } else {
                            //         logger1.warn('handCkeck interface', getTaskFinishResponse.message);
                            //         const desErr = getTaskFinishResponse.message;
                            //         mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102112', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                            //         ctx.body = { code: 400, message: getTaskFinishResponse.message };
                            //     }
                            // } else {
                            //     getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            //     if (getTaskFinishResponse.code === 200) {
                            //         logger1.info('hankCheck interface', getTaskFinishResponse.message);
                            //         ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            //     } else {
                            //         logger1.warn('handCkeck interface', getTaskFinishResponse.message);
                            //         const desErr = getTaskFinishResponse.message;
                            //         mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102113', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                            //         ctx.body = { code: 400, message: getTaskFinishResponse.message };
                            //     }
                            // }
                            getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            if (getTaskFinishResponse.code === 200) {
                                logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            } else {
                                logger1.warn('handCkeck interface', getTaskFinishResponse.message);
                                const desErr = getTaskFinishResponse.message;
                                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102113', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                                ctx.body = { code: 400, message: getTaskFinishResponse.message };
                            }
                        } else {
                            logger1.warn('currenNode is not right');
                            const desErr = 'currenNode is not right';
                            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102114', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                            ctx.body = { code: 400, message: 'currenNode is not right' };
                        }
                    } else {
                        if (currentNodeFromFron === currentNode) {
                            getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            if (getTaskFinishResponse.code === 200) {
                                logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            } else {
                                logger1.warn('handCkeck interface', getTaskFinishResponse.message);
                                const desErr = getTaskFinishResponse.message;
                                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102115', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                                ctx.body = { code: 400, message: getTaskFinishResponse.message };
                            }
                        } else {
                            logger1.warn('currentNode is not right');
                            const desErr = 'currentNode is not right';
                            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102116', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                            ctx.body = { code: 400, message: 'currentNode is not right' };
                        }
                    }
                } else {
                    logger1.warn('this taskId does not exist');
                    const desErr = 'this taskId does not exist';
                    mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102117', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                    ctx.body = { code: 400, message: 'this taskId does not exist' };
                }
            } else {
                logger1.warn('The box is out of order');
                const desErr = 'The box is out of order';
                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102118', time: new Date(), func: 'handCheckOver', desc: desErr, detail: desErr }), { qos: 0, retain: false });
                ctx.body = { code: 400, message: 'The box is out of order' };
            }
        }
    } catch (err) {
        logger1.fatal('fatal error', err);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302119', time: new Date(), func: 'handCheckOver', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fatal err ' + err };
    }
};

async function removePendingTask(ctx, next) {
    const logger1 = logger.scope('removePendingTask');
    try {
        const { taskId } = ctx.request.body;
        const result = await manager.remove({ key: taskId, set: 'pending' });
        ctx.body = result ? { code: 200, message: 'success' } : { code: 400, message: 'fail' };
    } catch (error) {
        logger1.fatal('fatal error', error);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302134', time: new Date(), func: 'removePendingTask', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fail' };
    }
};

async function realTimeWeight(ctx, next) {
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
            const desErr = 'fail';
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102132', time: new Date(), func: 'realTimeWeight', desc: desErr, detail: desErr }), { qos: 0, retain: false });
            ctx.body = { code: 400, message: 'fail' };
        }
    } catch (err) {
        logger1.fatal('fail'+ err);
        mqttClient.publish('optics/backend/log', JSON.stringify({ code: '102133', time: new Date(), func: 'realTimeWeight', desc: 'Unknown fatal.', detail: err }), { qos: 0, retain: false });
        ctx.body = { code: 400, message: 'fail' };
    }
};

module.exports = {
    'POST /api/optics/mission/taskGeneration': taskGeneration,
    'POST /api/optics/mission/handCheckOver': handCheckOver,
    'POST /api/optics/mission/allTaskGeneration': allTaskOrCheckGeneration,
    'POST /api/optics/mission/terminateTask': removePendingTask,
    'POST /api/optics/mission/realTimeWeight': realTimeWeight
};
