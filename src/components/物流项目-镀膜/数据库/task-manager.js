const { initOrm } = require('../../database/typeorm');
const { AgvTask } = require('../../database/entity/agv-task/agv-task');
const { TaskContent } = require('../../database/entity/agv-task/task-content');
const { TaskProcess } = require('../../database/entity/agv-task/task-process');
const { NodeContent } = require('../../database/entity/agv-task/node-content');
const { NodeProcess } = require('../../database/entity/agv-task/node-process');

class Convert {
    static oneToSave(data) {
       const { primaryId, clusterId, pubTime, schedule, startTime, endTime, type, stepIndex, process, content } = data;
       let taskOld = new AgvTask();
       taskOld.primaryId = primaryId;
       taskOld.clusterId = clusterId;
       taskOld.pubTime = pubTime;
       taskOld.schedule = schedule;
       taskOld.startTime = startTime;
       taskOld.endTime = endTime;
       taskOld.type = type;
       taskOld.stepIndex = stepIndex;
       
       let tscontent = [];
       for (let i = 0; i < content.length; i++) {
            let taskContent = new TaskContent();
            taskContent.roadMap = content[i].roadMap;
            let roads = [];
            for (let j = 0; j < content[i].roadNodes.length; j++) {
                let nodecontent = new NodeContent();
                nodecontent.node = content[i].roadNodes[j].node;
                nodecontent.todo = content[i].roadNodes[j].todo;
                nodecontent.goods = content[i].roadNodes[j].goods;
                nodecontent.tag = content[i].roadNodes[j].tag;
                roads.push(nodecontent);
            }
            taskContent.roadNodes = roads;
            tscontent.push(taskContent);
       }

       taskOld.content = tscontent;

       let tsprocess = [];
       for (let i = 0; i < process.length; i++) {
            let taskProcess = new TaskProcess();
            taskProcess.roadMap = process[i].roadMap;
            taskProcess.nodeIndex = process[i].nodeIndex;
            taskProcess.carId = process[i].carId;
            taskProcess.startTime = process[i].startTime;
            taskProcess.endTime = process[i].endTime;
            let roadsprocess = [];
            for (let j = 0; j < process[i].roadNodes.length; j++) {
                let nodeprocess = new NodeProcess();
                nodeprocess.state = process[i].roadNodes[j].state;
                nodeprocess.roadLine = process[i].roadNodes[j].roadLine;
                nodeprocess.startTime = process[i].roadNodes[j].startTime;
                nodeprocess.endTime = process[i].roadNodes[j].endTime;
                nodeprocess.checkTime = process[i].roadNodes[j].checkTime;
                nodeprocess.message = process[i].roadNodes[j].message;
                roadsprocess.push(nodeprocess);
            }
            taskProcess.roadNodes = roadsprocess;
            tsprocess.push(taskProcess);
       }

       taskOld.process = tsprocess;

       return taskOld;
    }
}

class MissionManager {
     constructor() {
         this.repos = initOrm().then(db => db.getRepository(AgvTask));
     }

     async insert(taskInfo = {}) {
         return (await this.repos).save(Convert.oneToSave(taskInfo));
     }

     async getall() {
         return (await this.repos).find();
     }

     async query(primary) {
         return (await this.repos).findOne({ primaryId: primary });
     }

     async remove(primary) {
         return (await this.repos).delete({ primaryId: primary });
     }
}

module.exports = {
    MissionManager: new MissionManager()
}
