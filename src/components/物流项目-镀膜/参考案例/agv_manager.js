const { LessThan } = require('typeorm');
const { initOrm } = require('../../database/typeorm');
const { AGVInformation } = require('../../database/entity/agv-information');

class VehicleCenter {
    constructor() {
        this.repos = initOrm().then(db => db.getRepository(AGVInformation));
    }

    // 向调度中心申请空闲车辆
    async acquire({ area = '' } = {}) {
        let repos = await this.repos;
        let myagv = await repos.findOne({ area: area, working: 'idle' });
        if (!myagv) {
            throw new Error(`area ${area} no idle car`);
        }
        myagv.working = 'lock';
        return repos.save(myagv);
    }

    // 确认所申请车辆已被使用
    async consume({ id = '' } = {}) {
        let repos = await this.repos;
        let myagv = await repos.findOne({ id: id });
        if (!myagv) {
            return false;
        }

        myagv.working = 'busy';
        await repos.save(myagv);
        return true;
    }

    // 更新车辆状态信息
    async update(agvInfo = {}) {
        return (await this.repos).save(agvInfo);
    }

    async remove({ id = '' } = {}) {
        return (await this.repos).delete({ id: id });
    }

    async query({ id = '' } = {}) {
        return (await this.repos).findOne({ id: id });
    }

    async getall() {
        return (await this.repos).find();
    }

    async calcOffline(timeout) {
        let time = new Date();
        time.setSeconds(time.getSeconds() - timeout);
        let repos = await this.repos;
        let retval = await repos.find({
            select: ['id', 'linking'],
            where: [{ updatetime: LessThan(time) }]
        });

        retval.forEach((val, ii, arr) => {
            arr[ii].linking = 'offline';
        });
        await repos.save(retval);
    }

    async onlineInfo() {
        let repos = await this.repos;
        let result = await repos.find({
            select: ['id', 'working', 'linking', 'roadinfo.roadMap']
        });

        let linking = new Map();
        result.forEach(val => {
            if (!linking.has(val.working)) {
                linking.set(val.working, []);
            }
            if (!linking.has(val.linking)) {
                linking.set(val.linking, []);
            }
            linking.get(val.working).push({
                id: val.id,
                roadMap: val.roadinfo.roadMap
            });
            linking.get(val.linking).push({
                id: val.id,
                roadMap: val.roadinfo.roadMap
            });
        });

        return linking;
    }
}

module.exports = {
    agvManager: new VehicleCenter()
};
