const axios = require('axios');
const fnv1a = require('@sindresorhus/fnv1a');
const { initClient } = require('../util/protos/initClient1.js');
const { createMission, manager } = require('../service/mission-data/manager');

const taskGeneration = async(ctx, next) => {
    const primsekey = ctx.request.body.key; // 任务Id
    if (primsekey === '') {
        ctx.body = 'no received field';
    } else {
        const postkey = { key: primsekey };
        const taskData = await taskFromInformationCenter(postkey);
        ctx.body = 'received field';

        for (const mission of taskData) {
            if (await validate(mission)) {
                const geerationTask = await parseTask(mission); // 解析生成任务字段
                await storeToDatabase(geerationTask); // 存入数据库
            }
        }
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

const parseTask = async(mission) => {
    const key1 = new Date().toString();
    const key2 = Math.random().toString();
    const taskId = fnv1a(key1 + key2).toString();
    const boxId = mission.boxId;
    const stepIndex = mission.stepIndex;
    const content = mission.content;
    return {
        taskId: taskId,
        boxId: boxId,
        stepIndex: stepIndex,
        content: content
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

async function storeToDatabase(mission) {
    // 1.new
    const mdata = createMission();

    // 2.assign
    mdata.key = mission.taskId;
    mdata.schedule = Date.now();
    mdata.value = mission;

    // 3.insert data
    const result = await manager.insert(mdata);
    console.log('insert:', result);
}

const missionFinish = async(ctx, next) => {
    const node = ctx.request.body.carid;
    // 1 车辆监控模块
    const client = initClient(
        '/carEdge.proto',
        'carEdge',
        'carEdge',
        '10.0.16.27:8288'
    );
    // 2 gRPC通信
    try {
        const getTaskFinish = await new Promise((resolve, reject) => {
            client.handCheckMissionOver({ node: node }, function(err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
        // console.log('getTask', getTaskFinish);
        // 3 返回信息给前端
        if (getTaskFinish.code === 200) {
            ctx.body = getTaskFinish.message;
        } else {
            ctx.body = getTaskFinish.message;
        }
        // ctx.body = getTaskFinish;
    } catch (err) {
        ctx.status = 404;
        ctx.body = err;
        console.log('err', err);
    }
};

module.exports = {
    'POST /api/optics/mission/taskGeneration': taskGeneration,
    'POST /api/optics/mission/Finish': missionFinish
};
