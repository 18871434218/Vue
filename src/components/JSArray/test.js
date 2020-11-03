const axios = require('axios');
const { TaskObj } = require('./missionObj');

const taskgeneration = async (ctx, next) => {
    const taskId = ctx.request.body.taskId;    // 任务Id
    if (taskId == '') {
        ctx.body = 'no received field';
    } else {
        ctx.body = 'received field';
        const taskData = await taskInformation(taskId);
        let task = new TaskObj();
        let response = JSON.parse(taskData);
        for (let mission of response) {
            if (task.validate(mission)) {
                let oneMssion = task.parseInformation(taskData);       // 解析生成字段
                // 更新入库
            }
        }
    }
}

const taskInformation = function (taskId) {
    return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:3333/api/tasks', taskId)
        .then((response) => {
           if(response.status !== 200) {
               reject(response.status);
           } else {
               resolve(response.data);
           }
        })
    })
}

const missionFinish = async (ctx, next) => {
    const carId = ctx.request.body.carId;
    // 1 车辆监控模块  根据carId查询对应的IP
    
    // 2 gRPC通信
    
    // 3 返回信息给前端
}

module.exports = {
    'POST /api/optics/mission/generation': taskgeneration,
    'POST /api/optics/mission/Finish': missionFinish
};