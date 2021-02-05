import { logger } from '../../util/logger';
import { roadNet } from '../../service/road-net/roadnet-iomap';
import { getDefaultRoadMapNode } from '../../config/A-B_B-A_EBTA-manager';
import { missionManager } from '../mission-center/task-manager';
import { Point, NodeState, Mission } from '../mission-center/task-structure';

let point: Point = {
    node: 4,
    todo: { action: 11, target: 1, direction: 1, endLevel: 0 },
    goods: { type: 0, weight: 10 },
    tag: 0
};

let nodeState: NodeState = {
    state: 'pendding',
    roadLine: '',
    startTime: '',
    endTime: '',
    checkTime: '',
    message: ''
};

export async function newParseTask(mission: Mission) {
    const taskType = mission.type;
    const repeat = mission.repeat;
    let taskContent = [];
    const taskTime: Date = new Date(); 
    const taskId = `task_${Math.random().toString(16).substr(2, 8)}`;
    const content = await parseTaskContent(mission.content);
    taskContent = await swictBranch(taskType, content);
    const process = await parseTaskProcess(taskContent);

    return {
        repeat: repeat,
        mission: {
            primaryId: taskId,
            clusterId: '',
            pubTime: taskTime,
            schedule: taskTime,
            startTime: '',
            endTime: '',
            type: taskType,
            state: 'pendding',
            stepIndex: 0,
            content: content,
            process: process
        }
    }
};

async function swictBranch(type: string, content: any) {
    let taskContent;
    switch (type) {
        case 'coating':
            taskContent = await coatingBranch(content);
            break;
        case 'EBTA':
            taskContent = await ebtaBranch(content);
            break;
        case 'EBTB':
            taskContent = await ebtbBranch(content);
            break;
        default:
            taskContent = content;
            break;
    }
    return taskContent;
}

async function coatingBranch(content: any) {
    const logger1 = logger.scope('coatingBranch');
    let taskContent;
    if (content.length === 2 && content[0].roadNodes.length === 1 && content[1].roadNodes.length === 1) {
        taskContent = await preInsertCoatingNode(content);
        taskContent = await InsertPoint(taskContent);
     } else {
        logger1.error('输入数据类型不对，任务类型coating必须有两段且每段只能一个点');
        throw new Error('输入数据类型不对，任务类型coating必须有两段且每段只能一个点');
    }

    return taskContent;
}

async function ebtaBranch(content: any) {
    const logger1 = logger.scope('ebtaBranch');
    let taskContent;
    if (content.length === 1 && content[0].roadNodes.length === 2) {
        taskContent = await preInsertEBTANode(content);
        taskContent = await InsertPoint(taskContent);
    } else {
        logger1.error('输入数据不符合, 空箱运转只能是一段两个点');
        throw new Error('输入数据不符合, 空箱运转只能是一段两个点');
    }

    return taskContent;
}

async function ebtbBranch(content: any) {
    const logger1 = logger.scope('ebtaBranch');
    let taskContent;
    if (content.length === 1 && content[0].roadNodes.length === 2) {
        taskContent = await InsertPoint(content);
    } else {
        logger1.error('输入数据不符合, 空箱运转只能是一段两个点');
        throw new Error('输入数据不符合, 空箱运转只能是一段两个点');
    }

    return taskContent;
}

async function parseTaskContent(content: any) {
    let contents = [];
    for (const val of content) {
        const roadMap = val.roadMap;
        const roadNodes = await parseNodes(val.roadNodes);
        contents.push({ roadMap: roadMap, roadNodes: roadNodes });
    }

    return contents;
};

async function parseTaskProcess(content: any) {
    let process = [];
    for (const val of content) {
       const roadMap = val.roadMap;
       const roadNodes = await parseNodeProcess(val.roadNodes);  
       process.push({ roadMap: roadMap, roadNodes: roadNodes, nodeIndex: 0, carId: '', startTime: '', endTime: ''});
    }
     
    return process;
};

async function parseNodes(roadNode: any) {
    let copyNode = JSON.parse(JSON.stringify(point));
    let roadNodes = [];
    for (const val of roadNode) {
        copyNode.node = val.node;
        copyNode.todo.action = val.action;
        copyNode.todo.target = val.target;
        roadNodes.push(copyNode);
    }

    return roadNodes;
};

async function parseNodeProcess(roadNodes: any) {
    let processRoadNodes = [];
    let copyNodeState = JSON.parse(JSON.stringify(nodeState));
    for (let i = 0; i < roadNodes.length; i++) {
         processRoadNodes.push(copyNodeState);    
    }

    return processRoadNodes;
};

async function preInsertCoatingNode(content: any) {
    const logger1 = logger.scope('preInsertCoatingNode');
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

async function preInsertEBTANode(content: any) {
    const logger1 = logger.scope('preInsertEBTANode');
    const insertNodesEBTA = getDefaultRoadMapNode('EBTA');

    content[0].roadNodes.splice(1, 0, insertNodesEBTA[0], insertNodesEBTA[1]);
    logger1.info('EBTA插入8，9点成功');

    return content;
};

async function InsertPoint(content: any) {
    for (let i = 0; i < content.length; i++) {
        content[i].roadNodes = await pasreRoadNodeInsertPoint(content[i].roadMap, content[i].roadNodes);
    }

    return content;
};

async function pasreRoadNodeInsertPoint(roadMap: string, roadNodes: any) {
    let roadPonits: any[] = [];

    for (const val of roadNodes) {
        let InsertPoints: any[];
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

async function praseActionInsertLevel(PointObject: any, currentPoint: Point, currentAction: number) {
    let copystartNode = JSON.parse(JSON.stringify(point));
    let copyendNode = JSON.parse(JSON.stringify(point));
    let enterNode = PointObject.enterNode;
    let leaveNode = PointObject.leaveNode;
    let afterPraseObject = [];
    
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

async function startPointParse(startPoint: Point, currentAction: number) {
    startPoint.todo.endLevel = 1;
    startPoint.tag = -1;
    if (currentAction === 13) {
        startPoint.todo.action = 12;
    } else if (currentAction === 12) {
        startPoint.todo.action = 13;
    } else {
        startPoint.todo.action = 11;
    }

    return startPoint;
};

async function endPointParse(endPoint: Point) {
    endPoint.todo.action = 13;
    endPoint.tag = 1;

    return endPoint;
};

// store to mysql
export async function storeTodb(repeat: number, mission: any ) {
    let logger1 = logger.scope('storeTodb');
    let copyMission = JSON.parse(JSON.stringify(mission));
    if (repeat <= 0) {
        logger1.error('数据不符合, repeat必须大于或等于1');
        throw new Error('数据不符合, repeat必须大于或等于1');
    } else if (repeat === 1) {
        await missionManager.insert(mission); 
    } else {
        for (let i = 0; i < repeat; i++) {
            mission.clusterId = copyMission.primaryId;
            mission.primaryId = copyMission.primaryId + `-${i + 1}`;
            await missionManager.insert(mission);        
        }  
    }
}

// query car Ip and currentNode
export async function queryCurNodeAndTaskType(mission: any) {
    const currentCheckMission = mission.value;
    const taskType = currentCheckMission.taskType;
    const stepIndex = currentCheckMission.stepIndex;
    const currentContent = currentCheckMission.content[stepIndex];
    const nodesIndexs = currentContent.nodesIndex;
    const roadNodes = currentContent.roadNodes[nodesIndexs];
    const currentNodeName = roadNodes.node;

    return {
        currentTaskType: taskType,
        currentNode: currentNodeName
    };
};
