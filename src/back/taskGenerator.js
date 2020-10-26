const axios = require('axios');

const missionGeneration = async (ctx, next) => {
    const goodsNumber = ctx.request.body.goodsNumber;               // 货号
    const currentLocation = ctx.request.body.currentLocation;       // 当前位置
    
    const data = {
        goods: goodsNumber,
        location: currentLocation
    };
    console.log('-------------------task');
    var TaskInformation = null;

    await axios.post('http://127.0.0.1:3333/api/optics/InformationCenter', data)
    .then((res) => {
        TaskInformation = res.data;                             // 调用信息平台接口返回任务查询数据
        ctx.body(JSON.stringify(TaskInformation))
    }).catch((err) => {
        console.log(err)
    })
    // try {
    //     const data = {
    //         goods: goodsNumber,
    //         location: currentLocation
    //     }
    //     console.log('-------------------task')
    //     axios.post('http://127.0.0.1:3333/api/optics/InformationCenter', data)
    //     .then((res) => {
    //         // 查询出对应任务情况
    //         var TaskInformation = res.data;                         // 调用信息平台接口返回任务查询数据
    //         console.log("queryData", TaskInformation);
    //         // ctx.body = TaskInformation;
    //         console.log("ctx.body", ctx.body);
    //         // ctx.body = { carId: null, mission: null, task: null, error: null };    // 融合任务信息
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // } catch (err) {
    //     ctx.status = 404;
    //     ctx.body = err;
    //     console.log(err);
    // }
    // ctx.body = TaskInformation;
}

const missionFinish = async (ctx, next) => {
     const endFlag = ctx.request.body.endFlag;
     const carId = ctx.request.body.carId;
     const currentLocation = ctx.request.body.currentLocation;

     try {
       // 1 基于grpc传递给车端
       ctx.body = { }
     } catch {
        ctx.status = 404;
        ctx.body = err;
        console.log(err);
     }
}

module.exports = {
    'POST /api/optics/mission/generation': missionGeneration,
    'POST /api/optics/mission/Finish': missionFinish
    // 'GET /api/wxAgv': wxAgv,
    // 'GET /api/testProject': testProject
};
