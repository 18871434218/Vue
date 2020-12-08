const axios = require('axios');
const { createMission, manager } = require('../service/mission-data/manager');
const { manager: carManager } = require('../service/vehicle-center/manage');
const { postTaskPublishTime, postNodeCheckTime } = require('../service/mission-data/monitor');
const { initClient } = require('../util/clientProtos/initClient.js');
const { checkTasklist, checkTask } = require('./validate');

const taskGeneration = async(ctx, next) => {
    const primsekey = ctx.request.body.key;
    if (primsekey === '') {
        ctx.body = 'no received field';
    } else {
        const postkey = { key: primsekey };
        const taskData = await taskFromInformationCenter(postkey);
        const num = taskData.length;
        ctx.body = `received ${num} task`;

        for (const mission of taskData) {
            if (await validate(mission)) {
                const geerationTask = await newParseTask(mission);
                await storeToDatabase(geerationTask);
            } else {
                throw new Error('mission field error');
            }
        }
    }
};

const allTaskOrCheckGeneration = async(ctx, next) => {
    try {
        const allTask = ctx.request.body;
        const flag = await checkTasklist(allTask);
        if (flag === true) {
            const num = allTask.length;
            ctx.body = `received ${num} field`;
            for (const mission of allTask) {
                const genrationTask = await newParseTask(mission);
                await storeToDatabase(genrationTask);
            }
        } else {
            ctx.body = flag;
            for (const mission of allTask) {
                if (await checkTask(mission) === true) {
                    const genrationTask = await newParseTask(mission);
                    await storeToDatabase(genrationTask);
                } else {
                    continue;
                }
            }
        }
    } catch (err) {
        ctx.status = 404;
        ctx.body = err;
    }
};

const taskFromInformationCenter = function(taskId) {
    return new Promise((resolve, reject) => {
        axios.post('http://10.0.13.46:1618/api/tasks', taskId)
            .then((response) => {
                if (response.status !== 200) {
                    reject(response.status);
                } else {
                    resolve(response.data);
                }
            });
    });
};

const parseTaskContent = async(content) => {
    const ereaMap = [];
    for (const val of content) {
        const roadMap = val.area;
        const roadNodes = val.roadNodes;
        const repeat = val.repeat;
        ereaMap.push({ roadMap: roadMap, nodesIndex: -1, roadNodes: roadNodes, repeat: repeat });
    }
    return ereaMap;
};

const InsertNode = async(content) => {
    const insertNodes = [
        {
            node: 9,
            todo: { action: 1, target: 1, direction: 1, endLevel: 1 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 10,
            todo: { action: 2, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 11,
            todo: { action: 1, target: 1, direction: 1, endLevel: 1 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 13,
            todo: { action: 2, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        }
    ];

    const roadMapA = content[0].roadMap;
    const roadMapB = content[1].roadMap;
    if (roadMapA < roadMapB) {
        content[0].roadNodes.push(insertNodes[0]);
        content[1].roadNodes.unshift(insertNodes[1]);
    } else {
        content[0].roadNodes.push(insertNodes[2]);
        content[1].roadNodes.unshift(insertNodes[3]);
    }
    return content;
};

const newParseTask = async(mission) => {
    const taskId = mission.taskId;
    const boxId = mission.boxId;
    const taskType = mission.taskType;
    const stepIndex = 0;
    let taskContent = null;
    const content = await parseTaskContent(mission.content);

    // when taskType is coating, roadNodes need Insert node
    if (taskType === 'coating') {
        if (content.length === 1) {
            taskContent = content;
        } else {
            taskContent = await InsertNode(content);
        }
    } else {
        taskContent = content;
    }

    return {
        taskId: taskId,
        taskType: taskType,
        boxId: boxId,
        stepIndex: stepIndex,
        content: taskContent
    };
};

const validate = async(mission) => {
    const err = 'invalid Mission:';
    if (mission.boxId === '') {
        console.log('----', err);
        return false;
    } else if (mission.content.length === 0) {
        console.log('-----', err);
        return false;
    } else {
        return true;
    }
};

const storeToDatabase = async(mission) => {
    // 1.new
    const mdata = createMission();

    // 2.assign
    mdata.key = mission.taskId;
    mdata.schedule = Date.now();
    mdata.value = mission;

    // 3.insert data
    const result = await manager.insert(mdata);
    await postTaskPublishTime(mdata);
    console.log('insert:', result);
};

// Resin calculated weight
const computerWeight = async(currentCheckMission) => {
    const currentMission = currentCheckMission.value;
    const stepIndex = currentMission.stepIndex;
    const currentContent = currentMission.content[stepIndex];
    const nodesIndex = currentContent.nodesIndex;
    const roadNodes = currentContent.roadNodes;
    const currentRoadNode = roadNodes[nodesIndex];
    const currentWeight = currentRoadNode.currentWeight;
    let allweight = 0;
    const areaWeight = [];
    for (const area of currentMission.content) {
        let nodeWeight = 0;
        for (const node of area.roadNodes) {
            nodeWeight += node.goods.weight;
        }
        areaWeight.push(nodeWeight);
        allweight += nodeWeight;
    }
    let currentNodeWeight = 0;
    let nodeStepweight = 0;
    for (var i = 0; i <= nodesIndex; i++) {
        nodeStepweight += roadNodes[i].goods.weight;
    }
    if (stepIndex === 0) {
        currentNodeWeight = nodeStepweight;
    } else {
        for (var j = 0; j < stepIndex; j++) {
            currentNodeWeight += areaWeight[j];
        }
        currentNodeWeight += nodeStepweight;
    }
    return {
        Taskweight: allweight,
        currentweight: currentWeight,
        currentNodeWeight: currentNodeWeight
    };
};

// call the grpc of the car server
const toCallGrpc = function(currentNode, Ip) {
    const carIp = Ip + ':8288';
    console.log('-----', carIp);
    const client = initClient(carIp);
    const carEdge = client.carEdge;
    return new Promise((resolve, reject) => {
        carEdge.handCheckMissionOver({ node: currentNode }, function(err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};

// people to confirm task completion
const missionFinish = async(ctx, next) => {
    try {
        const taskId = ctx.request.body.taskId;
        const currentNode = ctx.request.body.currentNode;
        // by taskId---carId----ip
        const currentCheckMission = await manager.query({ key: taskId });
        let getTaskFinish = null;
        if (currentCheckMission !== null) {
            const currentTaskType = currentCheckMission.value.taskType;
            const stepIndex = currentCheckMission.value.stepIndex;
            const carId = currentCheckMission.value.content[stepIndex].carId;
            const Ip = await carManager.queryIP(carId);
            if (Ip !== null) {
                if (currentTaskType === 'resin') {
                    const weightObject = await computerWeight(currentCheckMission);
                    const Taskweight = weightObject.Taskweight;
                    const currentweight = weightObject.currentweight;
                    const currentNodeWeight = weightObject.currentNodeWeight;
                    const flageWeight = Taskweight - currentweight - currentNodeWeight;
                    // if (flageWeight > -1 && flageWeight < 1)
                    if (flageWeight) {
                        getTaskFinish = await toCallGrpc(currentNode, Ip);
                        if (getTaskFinish.code === 200) {
                            ctx.body = getTaskFinish.message;
                            await postNodeCheckTime(currentCheckMission);
                        } else {
                            ctx.body = getTaskFinish.message;
                        }
                    } else {
                        ctx.body = 'weight not enough';
                    }
                } else {
                    getTaskFinish = await toCallGrpc(currentNode, Ip);
                    if (getTaskFinish.code === 200) {
                        ctx.body = getTaskFinish.message;
                        await postNodeCheckTime(currentCheckMission);
                    } else {
                        ctx.body = getTaskFinish.message;
                    }
                }
            } else {
                ctx.body = 'this car no IP';
            }
        } else {
            ctx.body = 'no this taskId';
        }
    } catch (err) {
        ctx.status = 404;
        ctx.body = err;
        console.log('------404', ctx.body);
    }
};

module.exports = {
    'POST /api/optics/mission/taskGeneration': taskGeneration,
    'POST /api/optics/mission/Finish': missionFinish,
    'POST /api/optics/mission/allTaskGeneration': allTaskOrCheckGeneration
};
