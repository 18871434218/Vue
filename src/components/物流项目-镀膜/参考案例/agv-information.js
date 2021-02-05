const { agvManager } = require('./agv-manager');
const _AGV = require('../../database/entity/agv-information');
const { Speed, Status, RoadInfo, Position, AGVInformation } = _AGV;

class Convert {
    static oldtoNew(data) {
        const { id, area, state, linking, value } = data;
        const { ip, node, segment, roadMap } = value;
        const { position, speed, agvStatus } = value;
        let agvNew = new AGVInformation();
        agvNew.id = id;
        agvNew.ip = ip;
        agvNew.area = area;
        agvNew.working = state;
        agvNew.linking = linking;

        agvNew.speed = new Speed();
        agvNew.speed.linear = speed.linear;
        agvNew.speed.angular = speed.angular;

        agvNew.status = new Status();
        agvNew.status.weight = agvStatus.weight;
        agvNew.status.batteryPercent = agvStatus.batteryPercent;

        agvNew.position = new Position();
        agvNew.position.agv_x = position.agv_x;
        agvNew.position.agv_y = position.agv_y;
        agvNew.position.heading = position.heading;

        agvNew.roadinfo = new RoadInfo();
        agvNew.roadinfo.node = node;
        agvNew.roadinfo.roadMap = roadMap;
        agvNew.roadinfo.segment = segment;

        return agvNew;
    }

    static newToOld(data) {
        const { id, ip, area, working, linking } = data;
        const { speed, status, position, roadinfo } = data;
        let agvOld = {};
        agvOld.id = id;
        agvOld.area = area;
        agvOld.state = working;
        agvOld.linking = linking;

        agvOld.value = {};
        agvOld.value.ip = ip;
        agvOld.value.node = roadinfo.node;
        agvOld.value.segment = roadinfo.segment;
        agvOld.value.roadMap = roadinfo.roadMap;

        agvOld.value.speed = speed;
        agvOld.value.position = position;
        agvOld.value.agvStatus = status;

        return agvOld;
    }
}

class VehicleCenter {
    // 向调度中心申请空闲车辆
    // input: opts:{ area: 1 || 2 }
    // return: VehicleInfo {...}
    async acquire(opts = {}) {
        let myagv = await agvManager.acquire(opts);
        return Convert.newToOld(myagv);
    }

    // 确认所申请车辆已被使用
    // input: vehicle：VehicleInfo，只用了id，area属性
    // return: true or false
    async consume(opts = {}) {
        await agvManager.consume(opts);
        return true;
    }

    // 更新车辆状态信息
    // input: vehicle：VehicleInfo
    // return: void
    async update(vehicle = {}) {
        await agvManager.update(Convert.oldtoNew(vehicle));
        return true;
    }

    // 根据车辆ID查询车辆IP
    // input: id (string)
    // return ip (string) 或 null
    async queryIP(id) {
        let myagv = await agvManager.query({ id: id });
        if (myagv && myagv.ip) {
            return myagv.ip;
        } else {
            return null;
        }
    }

    // 根据车辆ID查询车辆当前车辆重量
    // return currentWeight (int) 或 0
    async queryCurrentWeight(id) {
        let myagv = await agvManager.query({ id: id });
        if (myagv && myagv.status) {
            return myagv.status.weight;
        } else {
            return 0;
        }
    }

    async remove(vehicle = {}) {
        await agvManager.remove({ id: vehicle.id });
        return true;
    }

    async onlineInfo() {
        return agvManager.onlineInfo();
    }

    // 获取所有车辆状态信息
    async getall() {
        let allagv = await agvManager.getall();
        allagv.forEach((val, ii, arr) => {
            arr[ii] = Convert.newToOld(val);
        });

        return allagv;
    }

    // 根据车辆ID查询车辆状态
    // input: id (string)
    // return state (string) 或 null
    async queryStatus(id) {
        let myagv = await agvManager.query({ id: id });
        if (myagv && myagv.working) {
            return myagv.working;
        } else {
            return null;
        }
    }

    async queryALL(id) {
        let myagv = await agvManager.query({ id: id });
        return Convert.newToOld(myagv);
    }
}

module.exports = {
    Convert: Convert,
    manager: new VehicleCenter()
};
