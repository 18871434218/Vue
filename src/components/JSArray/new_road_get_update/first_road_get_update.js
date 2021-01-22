const { initClient } = require('../service/grpc/clientProtos/initClient');
const { getConfig } = require('../config/system-config-manager');
const clientOpts = getConfig('taskArrange.client') + ':50051';
const gRPCRoadNetClient = initClient(clientOpts).VehiclePool;
const { logger } = require('../util/logger.js');
const { roadNet } = require('../service/road-net/roadnet-iomap');
const { client: mqttClient } = require('../util/mqtt-client');

async function getRoadmap(roadList) {
    const logger1 = logger.scope('getRoadmap');
    const roadMap_data = [];
    let map_sum;
    let lane;
    let lane_sum;

    return new Promise((resolve, reject) => {
        try {
            const call = gRPCRoadNetClient.GetRoadmap({ range: roadList });
            call.on('data', function(response) {
                if (response.hasOwnProperty('map_sum') && response.hasOwnProperty('map_name') && response.hasOwnProperty('lane_state') && response.hasOwnProperty('lane') && response.map_sum !== 0 && response.lane_sum !== 0) {
                    map_sum = response.map_sum;
                    lane_sum = response.lane_sum;
                    lane = { lane_id: response.lane.lane_id, BN: response.lane.BN, FN: response.lane.FN };
                    roadMap_data.push({ map_name: response.map_name, lane_state: response.lane_state, lane: lane });
                }
            });
            call.on('error', function(error) {
                logger1.fatal('fatal' + error);
                mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302129', time: new Date(), func: 'getRoadmap', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
                reject(error);
            });

            call.on('end', function() {
                if (map_sum !== 0) {
                    resolve(roadMap_data);
                } else {
                    resolve(false);
                }
            });
        } catch (error) {
            logger1.fatal('fatal' + error);
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302130', time: new Date(), func: 'getRoadmap', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
            reject(error);
        }
    });
};

async function parseRoadNetData(roadMap) {
    let roadData = [];
    // let nodes = [];
    let lines = [];
    const laneLengths = roadMap.length;
    let mapNodes = new Map();

    for (let i = 1; i < laneLengths; i++) {
        let node = await parseNode(roadMap[i - 1].lane, roadMap[i - 1].map_name);
        mapNodes.set(node[0].id, node[0]);
        mapNodes.set(node[1].id, node[1]);
        let line = await parseLine(roadMap[i - 1]);
        lines.push(line);
        if (roadMap[i].map_name !== roadMap[i - 1].map_name) {
            let ObjectA = { area: roadMap[i - 1].map_name, nodes: Array.from(mapNodes.values()), lines: Array.from(new Set(lines)) };
            roadData.push(ObjectA);
            mapNodes.clear();
            lines.splice(0, lines.length);
        }
    }

    let lastNode = await parseNode(roadMap[laneLengths - 1].lane);
    mapNodes.set(lastNode[0].id, lastNode[0]);
    mapNodes.set(lastNode[1].id, lastNode[1]);
    let lastLine = await parseLine(roadMap[laneLengths - 1]);
    lines.push(lastLine);
    roadData.push({ area: roadMap[laneLengths - 1].map_name, nodes: Array.from(mapNodes.values()), lines: Array.from(new Set(lines)) });

    return roadData;
};

async function parseNode(lane, mapName) {
    let nodes = [];
    const BNid = lane.BN.NID;
    const where = [lane.BN.x, lane.BN.y];
    const deviceFlag = await roadNet(mapName).getbit(BNid);
    let firstNodeStatus;
    if (deviceFlag === 1) {
        firstNodeStatus = 'busy';
    } else {
        firstNodeStatus = 'idle';
    }
    nodes.push({ id: BNid, where: where, status: firstNodeStatus });
    const FNid = lane.FN.NID;
    const where1 = [lane.FN.x, lane.FN.y];
    const deviceFlag1 = await roadNet(mapName).getbit(FNid);
    let secondNodeStatus;
    if (deviceFlag1 === 1) {
        secondNodeStatus = 'busy';
    } else {
        secondNodeStatus = 'idle';
    }
    nodes.push({ id: FNid, where: where1, status: secondNodeStatus });

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
    const logger1 = logger.scope('updateRoadmap');
    return new Promise((resolve, reject) => {
        try {
            gRPCRoadNetClient.UpdateRoadmap(conent, function(err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
            mqttClient.publish('optics/backend/log', JSON.stringify({ code: '302131', time: new Date(), func: 'updateRoadmap', desc: 'Unknown fatal.', detail: error }), { qos: 0, retain: false });
            logger1.fatal('fatal' + error);
        }
    });
};

module.exports = { getRoadmap, updateRoadmap, parseRoadNetData };
