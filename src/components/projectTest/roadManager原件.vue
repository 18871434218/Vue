<template>
    <el-row id="roadManager">
        <el-row>
            <el-col :span="15">&nbsp;</el-col>
            <el-col :span="4">
                <div style="font-size:22px;float:right">设备ID</div>
            </el-col>
            <el-col :span="4">
                <div v-if="canSee" style="float:right">
                    <el-select
                        v-model="car_id"
                        filterable
                        placeholder="请选择设备"
                        size="mini"
                        @change="onDeviceChange()"
                    >
                        <el-option
                            v-for="item in id_value"
                            :key="item.car_id"
                            :label="item.car_id"
                            :value="item.car_id"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row style="background:rgba(255, 255, 255, 0.1);">
            <el-row>
                <el-col :span="4" style="font-size:22px;">构建路网</el-col>

                <el-col :span="20" style="font-size:22px;">
                    <el-switch
                        v-model="if_pic"
                        active-text="开启"
                        inactive-text="关闭"
                        @change="if_picChange()"
                        :disabled="build_road_disable"
                    ></el-switch>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" style="font-size:22px;">
                    <div>
                        当前节点数&nbsp;&nbsp;&nbsp;
                        <span>{{node.length}}</span>
                    </div>
                </el-col>
                <el-col :span="20">
                    <el-button round size="mini" type="primary" :disabled="add_node_disabled" @click="addnumber" style="font-size:14px">
                        新增节点
                    </el-button>
                </el-col>
                <el-col :span="6" id="cunNode">
                    <!-- // 新建路网-跳出确认框   添加路网名称 -->
                    <el-dialog title="请为新路网编辑名称" :visible.sync="editshow" width="25%">
                        <div style="white-space:nowrap;">
                            名字: &nbsp;&nbsp;&nbsp;&nbsp;
                            <el-input
                                v-model="new_name"
                                size="mini"
                                placeholder="请输入名字"
                                style="width:70%"
                                clearable
                            />
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="editshow=false">取 消</el-button>
                            <el-button
                                type="primary"
                                @click="saveNew"
                                :disabled="road_new_name_disabled"
                            >确 定</el-button>
                        </span>
                    </el-dialog>
                </el-col>
            </el-row>
            <el-row>
                <el-row>
                    <el-col :span="4" style="font-size:22px;">路网导入</el-col>
                    <el-col :span="11" style="font-size:22px;">设备端路网列表</el-col>
                    <el-col :span="8" style="font-size:22px;">本地路网列表</el-col>
                </el-row>
                <el-row>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="10">
                        <!-- <span>设备端路网列表</span> -->
                        <div style="height:300px; background-color:#1a304a;">
                            <el-checkbox-group v-model="selectDeviceRoads" ref="carRoadsTable">
                                <el-checkbox
                                    v-for="(DeviceRoads, DeviceRoadsindex) in carRoadsData"
                                    :key="DeviceRoadsindex"
                                    :index="DeviceRoadsindex +''"
                                    :label="DeviceRoads.name"
                                >{{DeviceRoads.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>

                        <el-row style="margin-top:30px; margin-left:80px">
                            <el-col :span="11">
                                <el-button
                                    round
                                    size="mini"
                                    style="font-size:14px;"
                                    type="primary"
                                    :disabled="currentRowCar == null || car_id == null"
                                    @click="deleteCarRoads()"
                                >
                                    删除路网
                                </el-button>
                            </el-col>
                            <el-col :span="11">
                                <el-button
                                    round
                                    size="mini"
                                    style="font-size:14px;"
                                    type="primary"
                                    :disabled="currentRowCar == null || car_id == null"
                                    @click="carRoadsToLocal()"
                                >
                                   下载路网
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="10">
                        <!-- <span>本地路网列表</span> -->
                        <div style="height:300px; background-color:#1a304a;">
                            <el-checkbox-group v-model="selectLocalRoads" ref="localRoadsTable">
                                <el-checkbox
                                    v-for="(LocalRoads, LocalRoadindex) in LocalRoadsData"
                                    :key="LocalRoadindex"
                                    :index="LocalRoadindex+''"
                                    :label="LocalRoads.name"
                                >{{LocalRoads.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>

                        <el-row style="margin-top:30px; margin-left:80px">
                            <el-col :span="11">
                                <el-button
                                    round
                                    size="mini"
                                    style="font-size:14px;"
                                    type="primary"
                                    :disabled="currentRowLocal == null"
                                    @click="deleteLocalRoads()"
                                >
                                    删除路网
                                </el-button>
                            </el-col>

                            <el-col :span="11">
                                <el-button
                                    round
                                    size="mini"
                                    style="font-size:14px;"
                                    type="primary"
                                    :disabled="currentRowLocal == null || car_id == null"
                                    @click="localRoadsToCar()"
                                >
                                    上传路网
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                </el-row>
            </el-row>
        </el-row>
    </el-row>
</template>

<script>
    import roadMap from "./parts/roadMap";
    import editor from "./parts/editor";
    // import addNode from "./parts/addNode";
    export default {
        inject: ["the_cars", "LocalRoadsData"], //在祖先组件中取数据
        components: { roadMap, editor },
        data() {
            return {
                fileList: [],
                if_pic: false,
                car_id: null,
                roads_temp: null,

                //添加
                // roads_add: null,
                /* node_X : null,
                node_Y : null, */
                node: [],
                // singnode: [],
                PostnodeXY: [],

                canSee: true,
                currentRowCar: null,
                currentRowLocal: null,

                new_name: null,
                //添加：
                delete_name: null,

                editshow: false,

                carRoadsData: [
                    // { name: "sample" },
                    // { name: "sample2" },
                ],

                selectLocalRoads: [], //本地端选中地图
                selectDeviceRoads: [], //设备端选中地图
            };
        },
        computed: {
            LocalRoadsDataPlus() {
                let temp = [{ name: "NEW", data: { places: [], lines: [] } }];
                return temp.concat(this.LocalRoadsData);
            },
            number_nodes() {
                if (this.currentRowLocal == null) {
                    return "unknown";
                } else {
                    // 不知道这段作用,会影响 本地路网按钮使能
                    // return this.currentRowLocal.data.places.length;
                    return 0;
                }
            },
            id_value() {
                return this.the_cars;
            },

            add_node_disabled() {
                return !(this.id_value && this.if_pic);
            },
            build_road_disable() {
                return this.car_id ? false : true;
            },
            road_new_name_disabled() {
                if (this.new_name == null) return true;
                for (let road of this.$root.LocalRoadsData) {
                    if (this.new_name == road.name) {
                        return true;
                    }
                }
                return false;
            },
        },
        created() {
            if (this.id_value != "") {
                this.canSee = true;
            }
        },
        // 生命周期函数，页面刷新时调用
        mounted() {
            this.updateLocalRoadList();
        },

        watch: {
            roads_temp: {
                handler(val) {
                    this.dataToMap(
                        this.$refs.roadMapBig,
                        val.data.places,
                        val.data.lines
                    );
                },
                deep: true,
            },

            id_value: {
                //数据更新后会刷dom
                handler(val) {
                    console.log(val);
                    if (typeof val == "object") {
                        this.canSee = false;
                        this.canSee = true;
                    }
                },
                deep: true,
                immediate: true,
            },

            selectLocalRoads(val) {
                if (val.length != 0) {
                    this.currentRowLocal = val;
                } else {
                    this.currentRowLocal = null;
                }
            },

            selectDeviceRoads(val) {
                if (val.length != 0) {
                    this.currentRowCar = val;
                } else {
                    this.currentRowCar = null;
                }
            },
        },

        methods: {
            async switchTocar() {
                try {
                    if (this.car_id == null) return false;
                    let url = "/api/agv/fileManager/switchToCar";
                    let data = { carId: this.car_id };
                    let response = await this.$http.post(url, data);
                    return response.status === 200;
                } catch (err) {
                    return false;
                }
            },
            // 服务端路网文件列表
            updateLocalRoadList() {
                let url = "/api/agv/fileManager/getFileList";
                let data = { src: "local", type: "road" };

                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("pullLocalMapList failed");
                    } else {
                        // 注意引用数据
                        this.$root.LocalRoadsData.splice(0);
                        for (let val of response.data) {
                            this.$root.LocalRoadsData.push({
                                name: val,
                                data: { places: [], lines: [] },
                            });
                        }
                        console.log("本地路网", this.$root.LocalRoadsData);
                    }
                });
            },

            // 新建路网文件数据上传
            updateLocalRoadsNetData() {
                let url = "/api/agv/fileManager/setRoadData";
                let data = {
                    file: this.new_name,
                    places: this.PostnodeXY,
                    lines: [],
                };

                this.$http.post(url, data).then((response) => {
                    if (response.status != 200) {
                        console.log("获取节点信息失败");
                    } else {
                        //  this.$root.LocalRoadsData.splice(0);
                        //  for(let val of response.data){
                        //    this.$root.LocalRoadsData.push({
                        //        name: val,
                        //        data: {places:[], lines:[]}
                        //    });
                        //  }
                        console.log("新建的本地路网", this.$root.LocalRoadsData);
                    }
                });
            },

            // 车端路网文件列表
            updateCarRoadList() {
                let url = "/api/agv/fileManager/getFileList";
                let data = { src: "remote", type: "road" };
                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("getListOfDeviceMapFiles failed");
                    } else {
                        this.carRoadsData.splice(0);
                        for (let val of response.data) {
                            this.carRoadsData.push({ name: val });
                        }
                        console.log("车端路网", this.carRoadsData);
                    }
                });
            },

            // 删除车端路网
            deleteCarRoads() {
                let file = [];

                for (let DeviceRoad of this.selectDeviceRoads) {
                    file.push(DeviceRoad);
                }

                let url = "/api/agv/fileManager/removeFiles";
                let data = { src: "remote", type: "road", files: file };
                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("deletCarMaps fails");
                    } else {
                        // update car map list
                        this.updateCarRoadList();
                    }
                });
            },

            // 删除服务端路网
            deleteLocalRoads() {
                let file = [];
                for (let LocalRoad of this.selectLocalRoads) {
                    file.push(LocalRoad);
                }

                let url = "/api/agv/fileManager/removeFiles";
                let data = { src: "local", type: "road", files: file };
                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("deletCarMaps fails");
                    } else {
                        this.updateLocalRoadList();
                    }
                });
            },

            // 添加节点
            addnumber() {
                //获取x, y 坐标
                let url = "/api/agv/infoQuery/carState";
                let data = { id: this.car_id, type: "basic_state" };

                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("获取节点信息失败");
                    } else {
                        try {
                            this.node.push([
                                response.data.vehicle_info.coordinateX,
                                response.data.vehicle_info.coordinateY,
                            ]);
                            console.log("获取节点信息坐标成功", this.node);
                        } catch (e) {
                            console.log(e);
                        } finally {
                            console.log("获取节点finally");
                        }
                    }
                });
            },

            // 禁用节点函数
            if_picChange() {
                if (this.if_pic == true) {
                    this.kaiqi = true;
                } else {
                    this.kaiqi = false;
                    this.editshow = true;
                }
                let url = "/api/agv/onlineAdjust/makeRoad";
                let temp = { id: this.car_id, flag: this.if_pic };
                this.$http.post(url, temp).then((response) => {
                    if (response.status != 200) {
                        console.log("构路节点失败");
                    } else {
                        console.log("构路节点成功");
                    }
                });
            },

            saveNew() {
                let url = "/api/agv/fileManager/setRoadData";
                let index = 0;
                for (const XY of this.node) {
                    this.PostnodeXY.push({ xy: XY, name: ++index });
                }

                let data = {
                    file: this.new_name,
                    places: this.PostnodeXY,
                    lines: [],
                };

                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        alert("存储节点和名称失败");
                    } else {
                        this.updateLocalRoadsNetData();
                        this.updateLocalRoadList();
                        this.$router.push({ name: "editor" });
                    }
                });
            },

            deleteNode() {
                this.delete_name = this.node;
                this.node = [];
            },

            carRoadsToLocal() {
                //拉取路网
                let file = [];

                //添加修改
                /* file.push(this.currentRowCar.name); */
                for (let Devicetolocal of this.selectDeviceRoads) {
                    file.push(Devicetolocal);
                }
                this.selectDeviceRoads = [];
                this.selectLocalRoads = [];

                let url = "/api/agv/fileManager/syncFiles";
                let data = {
                    src: "remote",
                    dst: "local",
                    type: "road",
                    files: file,
                };
                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("sync Car Map to local failed");
                    } else {
                        this.updateLocalRoadList();
                    }
                });
            },

            localRoadsToCar() {
                //本地上传路网
                let file = [];

                //添加修改
                /* file.push(this.currentRowLocal.name); */
                for (let LocalCar of this.selectLocalRoads) {
                    file.push(LocalCar);
                }

                this.selectLocalRoads = [];
                this.selectDeviceRoads = [];

                let url = "/api/agv/fileManager/syncFiles";
                let data = {
                    src: "local",
                    dst: "remote",
                    type: "road",
                    files: file,
                };
                this.$http.post(url, data).then((response) => {
                    if (response.status !== 200) {
                        console.log("sync local Map to car failed");
                    } else {
                        this.updateCarRoadList();
                    }
                });
            },

            async onDeviceChange() {
                this.updateLocalRoadList();

                if (await this.switchTocar()) {
                    this.updateCarRoadList();
                } else {
                    alert("车辆连接失败");
                }
            },

            toEdit() {
                this.$root.current_page.name = "editor";
                this.$router.push({ name: "editor" });
            },

            dataToMap(map, places, lines) {
                map.places = places;
                var x = 0;
                var y = 0;
                for (var i = 0; i < places.length; i++) {
                    x = x + places[i].xy[0];
                    y = y + places[i].xy[1];
                }
                x = x / places.length;
                y = y / places.length;
                map.map.getView().setCenter([x, y]);
                map.map.getView().setZoom(2);

                map.lines = this.transformLines(places, lines);
            },
            nameCancel() {
                this.edit_roads_visible = false;
                this.if_pic = true;
            },
            closeAndSubmit() {
                this.edit_roads_visible = false;
                this.submitRoadsToLocal();
            },
            submitRoadsToLocal() {},

            handleCurrentChangeLocal(val) {
                /* this.currentRowLocal = val; */
                if (this.if_pic == true) {
                    if (val == null) {
                        setTimeout(() => {
                            this.$refs.roadMap.places = [];
                            this.$refs.roadMap.lines = [];
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.dataToMap(
                                this.$refs.roadMap,
                                val.data.places,
                                val.data.lines
                            );
                        }, 1000);
                    }
                }
            },
            transformLines(places, lines) {
                let temp = [];
                for (var i = 0; i < lines.length; i++) {
                    temp.push({
                        start: places[lines[i].start - 1].xy,
                        end: places[lines[i].end - 1].xy,
                    });
                }
                return temp;
            },
        },
    };
</script>
<style>
    #roadManager {
        min-width: 1200px;
        min-height: 800px;
    }
</style>
<style scoped>
    @import "../SunnyCss.css";
    .el-row {
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .el-col {
        padding-left: 20px;
    }
</style>
