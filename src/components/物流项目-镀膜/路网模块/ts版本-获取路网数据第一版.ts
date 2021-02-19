import { initClient } from '../service/grpc/clientProtos/initClient';
import { getConfig } from '../config/system-config-manager';
const clientOpts = getConfig('taskArrange.client') + ':50051';
const gRPCRoadNetClient = initClient(clientOpts).VehiclePool;
import { logger } from '../util/logger';
import { roadNet } from '../service/road-net/roadnet-iomap';
import { report } from '../util/reporter';

export async function getRoadmap(roadList: any) {
    const logger1 = logger.scope('getRoadmap');
    const roadMap = new Map();
    return new Promise((resolve, reject) => {
        try {
            const call = gRPCRoadNetClient.GetRoadmap({ range: roadList });
            call.on('data', function(response: any) {
                const { map_name, lane_state, lane } = response;
                const { BN, FN } = lane;
                if (!roadMap.has(map_name)) {
                    roadMap.set(map_name, []);
                }

                roadMap.get(map_name)[lane.lane_id] = {
                    start: { id: BN.NID, where: [BN.x, BN.y], status: 'idle' },
                    end: { id: FN.NID, where: [FN.x, FN.y], status: 'idle' },
                    line: { id: lane.lane_id, start: [BN.x, BN.y], end: [FN.x, FN.y], state: lane_state, isBiDir: false }
                };
            });
            call.on('error', function(error: any) {
                logger1.fatal('fatal' + error);
                report({ code: '302129', func: 'getRoadmap', desc: 'Unknown fatal.', detail: error });
                reject(error);
            });

            call.on('end', function() {
                resolve(roadMap);
            });
        } catch (error) {
            logger1.fatal('fatal' + error);
            report({ code: '302130', func: 'getRoadmap', desc: 'Unknown fatal.', detail: error });
            reject(error);
        }
    });
};

export async function parseRoadNetData(roadMap: any) {
    let roadData = [];
    for (let map_name of roadMap.keys()) {
        let roadMapArray = roadMap.get(map_name);
        let area = await genRoadNet(map_name, roadMapArray);
        roadData.push(area);
    }

    return roadData;
};

async function genRoadNet(map_name: string, roadMapArray: any) {
    let nodes = new Map();
    let lines = new Map();
    for (let val of roadMapArray) {
        if (val === undefined) { continue; }
        let { start, end, line } = val;
        await Promise.all([parseNode(map_name, start), parseNode(map_name, end)]);
        nodes.set(start.id, start);
        nodes.set(end.id, end);
        lines.set(line.id, line);
    }

    return { area: map_name, nodes: Array.from(nodes.values()), lines: Array.from(lines.values()) };
};

async function parseNode(map_name: string, node: any) {
    let deviceFlag = await roadNet(map_name).getbit(node.id);
    if (deviceFlag === 1) {
        node.status = 'busy';
    }
};

export async function updateRoadmap(conent: any) {
    const logger1 = logger.scope('updateRoadmap');
    return new Promise((resolve, reject) => {
        try {
            gRPCRoadNetClient.UpdateRoadmap(conent, function(err: any, response: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        } catch (error) {
            reject(error);
            report({ code: '302131', func: 'updateRoadmap', desc: 'Unknown fatal.', detail: error });
            logger1.fatal('fatal' + error);
        }
    });
};
