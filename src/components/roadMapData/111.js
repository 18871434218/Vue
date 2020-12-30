const { initClient } = require('../service/grpc/clientProtos/initClient');
const gRPCRoadNetClient = initClient('10.0.13.48:50051').VehiclePool;

// 拉取路网数据
async function getRoadNet(ctx, next) {
    try {
       const roadList = ctx.request.body.range;
       const roadMapData = await getRoadmap(roadList);
       if (roadMapData === false) {
         ctx.body = { code: 400, value: 'no roadMap' };
       } else {
         const toFrontRoadData = await parseRoadNetData(roadMapData);
         ctx.body = { code: 200, value: toFrontRoadData };
       }
    } catch (error) {
       ctx.body = { code: 400, value: 'fatel' + error };
    }
};

async function getRoadmap(roadList) {
    let roadMap_data = [];
    let map_sum;
    let lane;
    let lane_sum;

    return new Promise((resolve, reject) => {
        let call = gRPCRoadNetClient.GetRoadmap({ range: roadList });
        call.on('data', function(response){
            if (response.hasOwnProperty('map_sum') && response.hasOwnProperty('map_name') && response.hasOwnProperty('lane_state') && response.hasOwnProperty('lane') && response.map_sum !== 0 && response.lane_sum !== 0) {
               map_sum = response.map_sum;
               lane_sum = response.lane_sum;
               lane = { lane_id: response.lane.lane_id, BN: response.lane.BN, FN: response.lane.FN };
               roadMap_data.push({ map_name: response.map_name, lane_state: response.lane_state, lane: lane});
            }
        });

        call.on('end',function(){
            if (map_sum !== 0) {
                // console.log('-----lane_sum', lane_sum);
                // console.log('----lines', roadMap_data.length);
                resolve(roadMap_data);
            } else {
                reject(false);
            }
        });
    });
};

async function parseRoadNetData(roadMap) {
    let roadData = [];
    let nodes = [];
    let lines = [];
    const laneLengths = roadMap.length;
    
    for (let i = 0; i < laneLengths; i++) {
        const node = await parseNode(roadMap[i].lane);
        nodes.push(node[0]);
        nodes.push(node[1]);
        const line = await parseLine(roadMap[i]);
        lines.push(line);
        if (roadMap[i].map_name !== roadMap[i+1].map_name && i < laneLengths) {
           const ObjectA = { area: roadMap[i-1].map_name, nodes: Array.from(new Set(nodes)), lines: Array.from(new Set(lines)) };
           roadData.push(ObjectA);
           nodes.splice(0, nodes.length);
           lines.splice(0, lines.length);
        }
    }
    roadData.push({ area: roadMap[laneLengths-1].map_name, nodes: Array.from(new Set(nodes)), lines: Array.from(new Set(lines))});

    return roadData;
};

async function parseNode(lane) {
    const nodes = [];
    const BNid = lane.BN.NID;
    const where = [lane.BN.x, lane.BN.y];
    nodes.push({ id: BNid, where: where, status: 'idle'});
    const FNid = lane.FN.NID;
    const where1 = [lane.FN.x, lane.FN.y];
    nodes.push({ id: FNid, where: where1, status: 'idle'});  
    
    return nodes;
};

async function parseLine(lineObject) {
    const id = lineObject.lane.lane_id;
    const start = [lineObject.lane.BN.x, lineObject.lane.BN.y];
    const end = [lineObject.lane.FN.x, lineObject.lane.FN.y];
    const state = lineObject.lane_state;
    
    return { id: id, start: start, end: end, state: state, isBiDir: false };
};

async function updateRoadmap(conent) {
    return new Promise((resolve, reject) => {
          gRPCRoadNetClient.UpdateRoadmap(conent, function(err, response) {
              if (err) {
                  reject(err);
              } else {
                  resolve(response);
              }
          }) 
    });
};

// 修改路网数据
async function setRoadNet(ctx, next) {
   try {
       const allParameter = ctx.request.body;
       const conent = {
           roadmap: allParameter.roadmap, // 路网名称
           request_type: allParameter.request_type, // 修改路网类型：lane或者node
           request_id: allParameter.request_id, // 对应的id
           state: allParameter.state // 对应的free或者blocked
       }
       console.log('data----', conent);
       const responseData = await updateRoadmap(conent);
       if (responseData.code === 200) {
           ctx.body = { code: 200, message: responseData.message };
       } else {
           ctx.body = { code: 400, message: responseData.message };
       }
   } catch (error) {
       ctx.body = { code: 400, message: 'fatel' + error };
   }
};

module.exports = {
    'POST /api/getRoadNet': getRoadNet,
    'POST /api/setRoadNet': setRoadNet
}