const { createMission, manager } = require('../service/mission-data/manager');
const { manager: carManager } = require('../service/vehicle-center/manage');
const { postTaskPublishTime } = require('../service/mission-data/task-monitor');
const { handCheck } = require('../service/car-mission/mission-apis');
const { checkTasklist, checkTask, checkHandCheckField } = require('./validate');
const { logger } = require('../util/logger.js');
const { client: mqttClient } = require('../../util/mqtt-client');
const { roadNet } = require('../service/road-net/roadnet-iomap');
const { getDefaultRoadMapNode } = require('../config/A-B_B-A_EBTA-manager');
const { report } = require('../util/reporter');

const point1 = {
    node: 4,
    todo: { type: 'LIFT', action: 11, target: 1, direction: 1, endLevel: 0 },
    goods: { type: 0, weight: 10 },
    insert: 0
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
            report({ code: '302107', func: 'taskGeneration', desc: 'task field error', detail: flag });
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
        report({ code: '302108', func: 'taskGeneration', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: '404 fatal error' + err };
    }
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
        if (content.length === 2 && content[0].roadNodes.length === 1 && content[1].roadNodes.length === 1 && !mission.hasOwnProperty('test')) {
            taskContent = await preInsertCoatingNode(content);
            taskContent = await InsertPoint(taskContent);
        } else if (mission.hasOwnProperty('test') && mission.test === true) {
            taskContent = content;
        } else {
            logger1.error('输入数据类型不对，任务类型coating必须有两段且每段只能一个点');
            throw new Error('输入数据类型不对，任务类型coating必须有两段且每段只能一个点');
        }
    } else if (taskType === 'EBTA') {
        if (content.length === 1 && content[0].roadNodes.length === 2 && !mission.hasOwnProperty('test')) {
            taskContent = await preInsertEBTANode(content);
            taskContent = await InsertPoint(taskContent);
        } else if (mission.hasOwnProperty('test') && mission.test === true) {
            taskContent = content;
        } else {
            logger1.error('输入数据不符合, 空箱运转只能是一段两个点');
            throw new Error('输入数据不符合, 空箱运转只能是一段两个点');
        }
    } else if (taskType === 'EBTB') {
        if (content.length === 1 && content[0].roadNodes.length === 2) {
            taskContent = await InsertPoint(content);
        } else if (mission.hasOwnProperty('test') && mission.test === true) {
            taskContent = content;
        } else {
            logger1.error('输入数据不符合, 空箱运转只能是一段两个点');
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

const parseTaskContent = async(content) => {
    const areaMap = [];
    for (const val of content) {
        const roadMap = val.area;
        const roadNodes = await parseNodes(val.roadNodes);
        const repeat = val.repeat;
        areaMap.push({ roadMap: roadMap, nodesIndex: -1, roadNodes: roadNodes, repeat: repeat, repeatIndex: 0 });
    }

    return areaMap;
};

const parseNodes = async(roadNodes) => {
    const roadNodes1 = [];
    for (const val of roadNodes) {
        const node = val.node;
        const todo = val.todo;
        const goods = val.goods;
        roadNodes1.push({ node: node, todo: todo, goods: goods, insert: 0 });
    }
    return roadNodes1;
};

const preInsertCoatingNode = async(content) => {
    const logger1 = logger.scope('InsertNode');
    const InsertcoatingAB = getDefaultRoadMapNode('coatingAB');
    const InsertcoatingBA = getDefaultRoadMapNode('coatingBA');

    for (let i = 1; i < content.length; i++) {
        if (content[i].roadMap < content[i - 1].roadMap) {
            logger1.info('roadMap B 到roadMap A 插入7和6');
            content[i - 1].roadNodes.push(InsertcoatingBA[0]);
            content[i].roadNodes.unshift(InsertcoatingBA[1]);
        } else if (content[i].roadMap > content[i - 1].roadMap) {
            logger1.info('roadMap A 到roadMap B 插入4和5');
            content[i - 1].roadNodes.push(InsertcoatingAB[0]);
            content[i].roadNodes.unshift(InsertcoatingAB[1]);
        } else {
            logger1.info('相同roadMap不插入节点');
            continue;
        }
    }

    return content;
};

const preInsertEBTANode = async(content) => {
    const logger1 = logger.scope('preInsertEBTANode');
    const insertNodesEBTA = getDefaultRoadMapNode('EBTA');

    content[0].roadNodes.splice(1, 0, insertNodesEBTA[0], insertNodesEBTA[1]);
    logger1.info('EBTA插入8，9点成功');

    return content;
};

const InsertPoint = async(content) => {
    for (let i = 0; i < content.length; i++) {
        content[i].roadNodes = await pasreRoadNodeInsertPoint(content[i].roadMap, content[i].roadNodes);
    }
    return content;
};

const pasreRoadNodeInsertPoint = async(roadMap, roadNodes) => {
    // const logger1 = logger.scope('pasreInsertCoatingPoint');
    let roadPonits = [];

    for (const val of roadNodes) {
        let InsertPoints = [];
        let currentPoint = val.node;
        let currentAction = val.todo.action;
        let PointObject =  await roadNet(roadMap).getNode(currentPoint);
        if (PointObject === null) {
           throw new Error('输入数据不符合, 当前该区域路网该点不存在');
        };
        InsertPoints = await praseActionInsertLevel(PointObject, val, currentAction);
        roadPonits.push.apply(roadPonits, InsertPoints);
    }

    return roadPonits;
};

const praseActionInsertLevel = async(PointObject, currentPoint, currentAction) => {
    let copystartNode = JSON.parse(JSON.stringify(point1));
    let copyendNode = JSON.parse(JSON.stringify(point1));
    const enterNode = PointObject.enterNode;
    const leaveNode = PointObject.leaveNode;
    let afterPraseObject;
    
    if (enterNode !== 0 && leaveNode === 0) {
        copystartNode.node = enterNode;
        copystartNode = await startPointParse(copystartNode, currentAction);
        afterPraseObject = [copystartNode, currentPoint];
    } else if (enterNode === 0 && leaveNode !== 0) {
        copyendNode.node = leaveNode;
        copyendNode = await endPointParse(copyendNode);
        afterPraseObject = [currentPoint, copyendNode];
    } else if (enterNode !== 0 && leaveNode !== 0) {
        copystartNode.node = enterNode;
        copystartNode = await startPointParse(copystartNode, currentAction);
        copyendNode.node = leaveNode;
        copyendNode = await endPointParse(copyendNode);
        afterPraseObject = [copystartNode, currentPoint, copyendNode];
    } else {
        afterPraseObject = [currentPoint];
    }

    return afterPraseObject;
};

const startPointParse = async(startPoint, currentAction) => {
    startPoint.todo.endLevel = 1;
    startPoint.insert = -1;
    if (currentAction === 13) {
        startPoint.todo.action = 12;
    } else if (currentAction === 12) {
        startPoint.todo.action = 13;
    } else {
        startPoint.todo.action = 11;
    }

    return startPoint;
};

const endPointParse = async(endPoint) => {
    endPoint.todo.action = 13;
    endPoint.insert = 1;

    return endPoint;
}; 

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

const checkFlag = async(stepIndex, stepLength, roadsIndex, roadLength) => {
    if (stepIndex === stepLength && roadsIndex === roadLength) {
        return true;
    } else {
        return false;
    }
};

// query car Ip and currentNode
const queryCurWeightAndCurNodeAndTaskType = async(mission) => {
    const currentCheckMission = mission.value;
    const taskType = currentCheckMission.taskType;
    const stepIndex = currentCheckMission.stepIndex;
    const content = currentCheckMission.content;
    const contentLength = content.length - 1;
    const currentContent = currentCheckMission.content[stepIndex];
    const nodesIndexs = currentContent.nodesIndex;
    const nodesLength = currentContent.roadNodes.length - 1;
    const roadNodes = currentContent.roadNodes[nodesIndexs];
    const currentNodeName = roadNodes.node;
    const carId = currentContent.carId;
    const currentCarWeight = await carManager.queryCurrentWeight(carId);
    // const flag = await checkFlag(stepIndex, contentLength, nodesIndexs, nodesLength);
    return {
        currentTaskType: taskType,
        currentNode: currentNodeName,
        currentCarWeight: currentCarWeight
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
                const currentCheckMission = await manager.query({ key: taskIdFromFron });
                let getTaskFinishResponse = null;
                if (currentCheckMission !== null) {
                    const queryData = await queryCurWeightAndCurNodeAndTaskType(currentCheckMission);
                    const currentTaskType = queryData.currentTaskType;
                    const currentNode = queryData.currentNode;
                    // const flag = queryData.flag;
                    const currentCarWeight = queryData.currentCarWeight;
                    if (currentNodeFromFron === currentNode) {
                        if (currentTaskType === 'resin') {
                            const remainWeight = await computerWeight(currentCheckMission, currentCarWeight);
                            if ( remainWeight > -1 && remainWeight < 1) {
                                getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                                if (getTaskFinishResponse.code === 200) {
                                    logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                    ctx.body = { code: 200, message: getTaskFinishResponse.message };
                                } else {
                                    const desErr = 'handCkeck interface' + getTaskFinishResponse.message;
                                    logger1.warn(desErr);
                                    report({ code: '302112', func: 'handCheckOver', desc: desErr, detail: desErr });
                                    ctx.body = { code: 400, message: desErr };
                                }
                            } else {
                                const desErr = 'currenWeight is not right';
                                logger1.warn(desErr);
                                report({ code: '302113', func: 'handCheckOver', desc: desErr, detail: desErr });
                                ctx.body = { code: 400, message: desErr };
                            }
                        } else {
                            getTaskFinishResponse = await handCheck(currentCheckMission, currentNode);
                            if (getTaskFinishResponse.code === 200) {
                                logger1.info('hankCheck interface', getTaskFinishResponse.message);
                                ctx.body = { code: 200, message: getTaskFinishResponse.message };
                            } else {
                                const desErr = 'handCkeck interface' + getTaskFinishResponse.message;
                                logger1.warn(desErr);
                                report({ code: '302114', func: 'handCheckOver', desc: desErr, detail: desErr });
                                ctx.body = { code: 400, message: desErr };
                            }
                        }
                    } else {
                        const desErr = 'currentNode is not right';
                        logger1.warn(desErr);
                        report({ code: '302115', func: 'handCheckOver', desc: desErr, detail: desErr });
                        ctx.body = { code: 400, message: desErr };
                    }
                } else {
                    const desErr = 'this taskId does not exist';
                    logger1.warn(desErr);
                    report({ code: '302116', func: 'handCheckOver', desc: desErr, detail: desErr });
                    ctx.body = { code: 400, message: 'this taskId does not exist' };
                }
            } else {
                const desErr = 'The box is out of order';
                logger1.warn(desErr);
                report({ code: '302117', func: 'handCheckOver', desc: desErr, detail: desErr });
                ctx.body = { code: 400, message: desErr };
            }
        }
    } catch (err) {
        logger1.fatal('fatal error', err);
        report({ code: '302119', func: 'handCheckOver', desc: 'Unknown fatal.', detail: err });
        ctx.body = { code: 400, message: 'fatal error ' + err };
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
        report({ code: '305134', func: 'removePendingTask', desc: 'Unknown fatal.', detail: error });
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
            const desErr = 'fail';
            logger1.warn(desErr);
            report({ code: '105132', func: 'realTimeWeight', desc: desErr, detail: desErr });
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
