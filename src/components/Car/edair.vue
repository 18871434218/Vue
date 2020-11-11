<template>
    <el-row>
        <el-col :span="16">
            <roadMap ref="roadMap" style="height: 706px; width: auto; background-color: white;"></roadMap>
        </el-col>

        <el-col :span="8">
            <el-row>
                <el-col :span="8" style="font-size:22px;">路网信息</el-col>
                <el-col :span="16">
                    <el-select
                        size="mini"
                        v-if="canSee"
                        :disabled="if_edit == true"
                        v-model="selected_roads"
                        filterable
                        placeholder="请选择路网"
                        @change="on_selected_road_change()"
                    >
                        <el-option
                            v-for="(item, index) in road_names_list"
                            :key="index"
                            :label="item"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8" style="font-size:22px;">设备ID</el-col>
                <el-col :span="16">
                    <el-select v-model="selected_car" filterable placeholder="请选择设备" size="mini">
                        <el-option
                            v-for="item in which_analysis"
                            :key="item.car_id"
                            :label="item.car_id"
                            :value="item.car_id"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <div
                style="background:linear-gradient(to right,#000ff5,#00b400);height:1px;margin-top:35px;"
            ></div>

            <el-row>
                <el-col :span="8" style="font-size:22px;">节点编辑</el-col>
            </el-row>

            <el-tabs v-model="activeName">
                <el-tab-pane label="修改节点" name="first">

                    <el-row>
                        <el-col :span="8" style="font-size:18px;">节点列表</el-col>
                        <el-col :span="16">
                            <el-select
                                size="mini"
                                v-model="node_select"
                                @change="node_select_change"
                                v-if="canSee"
                                :disabled="selected_roads == null"
                                filterable
                                placeholder="选择要编辑的节点"
                            >
                                <el-option
                                    v-for="(item, index) in road_places"
                                    :key="index"
                                    :label="item.name"
                                    :value="index"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="7" style="font-size:18px;">节点坐标</el-col>
                        <el-col :span="5">X坐标</el-col>
                        <el-col :span="6">
                            <el-input-number :disabled="selected_roads==null" v-model="place_x" size="mini"></el-input-number>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="7">&nbsp;</el-col>
                        <el-col :span="5">Y坐标</el-col>
                        <el-col :span="6">
                            <el-input-number :disabled="selected_roads==null" v-model="place_y" size="mini"></el-input-number>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="7">&nbsp;</el-col>
                        <el-col :span="5">航向角</el-col>
                        <el-col :span="6">
                            <el-input-number :disabled="selected_roads==null" v-model="yaw" size="mini"></el-input-number>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">&nbsp;</el-col>

                        <el-col :span="6">
                            <el-button
                                round
                                size="mini"
                                type="primary"
                                :disabled="modify_place_disable"
                                @click="modify_place()"
                            >修改节点</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="新增节点" name="second">
                    <el-row>
                        <el-col :span="8"></el-col>
                        <el-col :span="6">
                            <el-button
                                round
                                size="mini"
                                type="primary"
                                :disabled="add_place_disable"
                                @click="add_place()"
                            >新增节点</el-button>
                        </el-col>
                </el-row>
                </el-tab-pane>
            </el-tabs>

            <div
                style="background:linear-gradient(to right,#000ff5,#00b400);height:1px;margin-top:35px;"
            ></div>

            <el-row>
                <el-col :span="8" style="font-size:22px;">路径编辑</el-col>
            </el-row>

            <el-row>
                <el-col :span="8" style="font-size:18px;">路径信息</el-col>
                <el-col :span="4">起点</el-col>
                <el-col :span="10">
                    <el-select
                        size="mini"
                        v-model="line_start"
                        v-if="canSee"
                        :disabled="selected_roads == null"
                        filterable
                        placeholder="请选择起点"
                    >
                        <el-option
                            v-for="(item, index) in road_places"
                            :key="index"
                            :label="item.name"
                            :value="index"
                            :disabled="item.disabled"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="4">终点</el-col>
                <el-col :span="10">
                    <el-select
                        size="mini"
                        v-model="line_end"
                        :disabled="selected_roads == null"
                        filterable
                        placeholder="请选择终点"
                    >
                        <el-option
                            v-for="(item, index) in road_places"
                            :key="index"
                            :label="item.name"
                            :value="index"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="4">速度</el-col>
                <el-col :span="10">
                    <el-input-number
                        :disabled="selected_roads == null"
                        v-model="line_info.SpeedPercent"
                        size="mini"
                        style="width:144px"
                    ></el-input-number>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="4">权重</el-col>
                <el-col :span="10">
                    <el-input-number
                        :disabled="selected_roads == null"
                        v-model="line_info.ExtraCost"
                        size="mini"
                        style="width:144px"
                    ></el-input-number>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="6">运动类型</el-col>
                <el-col :span="8">
                    <el-select
                        size="mini"
                        v-model="line_info.MotionType"
                        :disabled="selected_roads == null"
                        filterable
                        placeholder="请选择运动类型"
                    >
                        <el-option
                            v-for="(item, index) in MotionType"
                            :key="index"
                            :label="item.name"
                            :value="item.TypeDex"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="6">避障</el-col>
                <el-col :span="10">
                    <el-switch
                        size="mini"
                        style="font-size:18px"
                        :disabled="selected_roads == null"
                        v-model="line_info.ObstacleAvoid"
                        active-value='1'
                        inactive-value='0'
                        active-text="是"
                        inactive-text="否"
                    ></el-switch>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="6">进入工位</el-col>
                <el-col :span="10">
                    <el-switch
                        size="mini"
                        style="font-size:18px"
                        :disabled="selected_roads == null"
                        v-model="line_info.EnterStation"
                        active-value='1'
                        inactive-value='0'
                        active-text="是"
                        inactive-text="否"
                    ></el-switch>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">&nbsp;</el-col>
                <el-col :span="8">
                    <el-button
                        round
                        size="mini"
                        type="primary"
                        :disabled="add_line_disable"
                        @click="add_line()"
                    >新增/修改路径</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button
                        round
                        size="mini"
                        type="primary"
                        :disabled="del_line_disable"
                        @click="del_line()"
                    >删除路径</el-button>
                </el-col>
            </el-row>

            <el-row style="margin-top:30px;">
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="6">
                    <el-button
                        round
                        size="mini"
                        type="primary"
                        style="width:100px;"
                        :disabled="save_road_disable"
                        @click="save_road_data()"
                    >保存路网</el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import roadMap from "./roadMap";
import $ from "jquery";
import _ from "lodash";

export default {
    inject: ["LocalRoadsData", "the_cars"],
    components: { roadMap },
    data() {
        return {
            selected_car: null,
            activeName: 'first',
            node_select: null, //节点编辑选择的点

            place_x: null, //输入节点X坐标
            place_y: null, //输入节点Y坐标
            yaw: null, //航向角
            line_start: null, //路径编辑起点x
            line_end: null, //路径编辑终点Y

            selected_roads: null, //选择路网名称

            if_edit: false, //判断是否编辑
            is_new: false, //额外判断参数
            canSee: true, //选择路网是否看见

            MotionType: [
                // 运动类型，展示用
                { TypeDex: "0", name: "前进" },
                { TypeDex: "1", name: "左移" },
                { TypeDex: "2", name: "后退" },
                { TypeDex: "3", name: "右移" }
            ],

            road_names_list: [], // 路网文件名称数组
            current_road_data: {}, // 当前所选路网文件内容
            current_road_data_check: {}, // 用来校验当路网是否改变
            line_info: {
                start: [],
                end: [],
                LnID: 0,
                BNID: 0,
                FNID: 0,
                ObstacleAvoid: "0",
                MotionType: "前进",
                LimitVel: "1",
                SpeedPercent: 0,
                ExtraCost: 0,
                EnterStation: "0"
            },
            
            carSpeedPerent: 0,
            carExtraCost: 0,
            carMotionType: "前进",
            carObstacleAvoid: "0",
            carEnterStation: "0",
        };
    },
    mounted() {
        this.pull_road_names_list();
    },
    computed: {
        // 设备ID
        which_analysis() {
                return this.the_cars;
            },
        // 当前路的所有网节
        road_places: function() {
            let places = this.current_road_data.places;
            return places && Array.isArray(places) ? places : [];
        },
        // 当前路的所有路径,(带下标)
        road_lines_index: function() {
            let index = this.current_road_data.linesIndex;
            return index && Array.isArray(index) ? index : [];
        },
        // 当前路的所有路径,(带坐标)
        road_lines: function() {
            let lines = this.current_road_data.lines;
            return lines && Array.isArray(lines) ? lines : [];
        },
        // 新增节点使能条件
        add_place_disable: function() {
            if (this.selected_roads == null) return true;

            if (this.selected_car == null) return true;

            if (this.is_pose3d_data) return true;
        },

        // 修改节点使能条件
        modify_place_disable: function() {
            if (this.selected_roads == null || this.node_select == null)
                return true;
            if (this.is_pose3d_data) return true;

            let node = this.road_places[this.node_select];
            let x = parseFloat(this.place_x);
            let y = parseFloat(this.place_y);
            let yaw = parseFloat(this.yaw);
                return x == node.xy[0] && y == node.xy[1] && yaw == node.yaw ? true : false;
        },

        // 新增路径使能条件
        add_line_disable: function() {
                if (this.is_pose3d_data)
                return true;
                if (this.selected_roads == null || this.line_start == null || this.line_end == null)
                    return true;
        },

        // 删除路径使能条件
        del_line_disable: function() {
            if (this.is_pose3d_data) return true;

            if (
                this.selected_roads == null ||
                this.line_start == null ||
                this.line_end == null
            )
                return true;
        },

        existed_line_info: function() {
            let linehead = this.line_start + 1;
            let linetail = this.line_end + 1;
            let result = this.find_road_line({
                start: linehead,
                end: linetail
            });
            if (result.exist) {
                // update to ui
                this.line_info = this.road_lines[result.index];
            }
            return result;
        },
        save_road_disable: function() {
            if (this.is_pose3d_data) return true;
            return this.selected_roads == null;
        },
        // 判断pose3d点云数据
        is_pose3d_data: function() {
            return (
                this.selected_roads !== null &&
                this.selected_roads.startsWith("->")
            );
        },
    },

    watch: {
        existed_line_info() {},
        selected_roads: function selected_roads(val) {
            if (typeof val !== "string")
                console.error("road file name need string type");
        },

        current_road_data: {
            handler: function handler(val) {
                    this.data_to_map(this.$refs.roadMap, val.places, val.lines, false); //数据更新显示到地图
                this.canSee = false;
                this.canSee = true;
            },
            deep: true //handler监听函数，深度监听
        },

        road_places: {
            handler: function handler(val) {
                let lines = convert_road_lines(val, this.road_lines_index);
                this.current_road_data.lines = lines;
                function convert_road_lines(places, linesindex) {
                    let road_lines = [];
                    for (let value of linesindex) {
                        let temp = {};
                        Object.assign(temp, value);
                        temp.start = places[value.start - 1].xy;
                        temp.end = places[value.end - 1].xy;
                        road_lines.push(temp);
                    }
                    return road_lines;
                }
            },
            deep: true
        },
        
        // line_info: {
        //     handler: function handler(val) {
        //         if (this.existed_line_info.exist) {
        //             let index = this.existed_line_info.index;
        //             this.current_road_data.lines[index] = val;
        //             let val_cpy = JSON.parse(JSON.stringify(val));
        //             val_cpy.start = this.current_road_data.linesIndex[index].start;
        //             val_cpy.end = this.current_road_data.linesIndex[index].end;
        //             this.current_road_data.linesIndex[index] = val_cpy;
        //         }
        //     },
        //     deep: true //handler监听函数，深度监听
        // }
    },

    methods: {
        on_selected_road_change() {
            this.pull_road_data_by_name();
        },

        node_select_change() {
            let node = this.road_places[this.node_select];
            this.place_x = node.xy[0];
            this.place_y = node.xy[1];
            this.yaw = node.yaw;
        },

        save_road_data() {
            //这里添加post数据给后端   数据格式为：{file: "", places: [{ xy: [1, 2], name: "somewhere1" }], lines: [{ start: 1, end: 2 }] };  接口：POST /api/agv/fileManager/setRoadData

            let data = {
                file: this.selected_roads,
                places: this.road_places,
                linesIndex: this.road_lines_index
            };
            let url = "/api/agv/fileManager/setRoadData";

            this.$http.post(url, data).then(response => {
                if (response.status !== 200) {
                    console.log("路网编辑-保存修改失败");
                } else {
                    this.if_edit = false;
                    this.current_road_data_check = JSON.parse(JSON.stringify(this.current_road_data))
                }
            });
        },

        add_line() {
            if (this.line_start == this.line_end && this.line_start != null && this.line_end != null) {
                this.$message({
                    message: "起点终点重合",
                    type: "success"
                });
                return;
            }
            {
                // 将源对象复制到目标对象new_line
                console.log('line', this.line_info);
                const new_line = JSON.parse(JSON.stringify(this.line_info));
                // 路网协议中，路径下标从1开始，此处 +1
                new_line.start = this.line_start + 1;
                new_line.end = this.line_end + 1;
                if (this.find_road_line(new_line).exist) {
                    // this.line_info.SpeedPercent = ;
                    // this.line_info.ExtraCost = ;
                    // this.line_info.MotionType = ;
                    // this.line_info.ObstacleAvoid = ;
                    // this.line_info.EnterStation = ;

                    this.$message({
                            message: "路径修改成功",
                            type: "success"
                        });
                    return;
                }
                this.current_road_data.linesIndex.push(new_line);
                // console.log('....check');
            }
            {
                const new_line = JSON.parse(JSON.stringify(this.line_info));
                console.log('new', new_line);
                new_line.start = this.road_places[this.line_start].xy;
                new_line.end = this.road_places[this.line_end].xy;
                this.current_road_data.lines.push(new_line);
                this.$message({
                            message: "路径新增成功",
                            type: "success"
                        });
            }
        },

        del_line() {
            let line = { start: this.line_start + 1, end: this.line_end + 1 };
            let result = this.find_road_line(line);
            if (result.exist) {
                this.current_road_data.lines.splice(result.index, 1);
                this.current_road_data.linesIndex.splice(result.index, 1);
                this.$message({
                            message: "路径删除成功",
                            type: "success"
                    });
            } else {
                this.$message({
                            message: "路径不存在",
                            type: "success"
                    });
               }
        },

        add_place() {
            //获取x, y 坐标
            let url = "/api/agv/infoQuery/carState";
            let data = { id: this.selected_car, type: "basic_state" };

            this.$http.post(url, data).then((response) => {
                if (response.status !== 200) {
                    console.log("获取节点信息失败");
                } else {
                    try {
                        let lengths = this.current_road_data.places.length
                        let placename = (
                            Number(this.current_road_data.places[lengths-1].name) + 1
                        ).toString();

                        let x = parseFloat(response.data.vehicle_info.coordinateX);
                        let y =  parseFloat(response.data.vehicle_info.coordinateY);
                        let yaw = parseFloat(response.data.vehicle_info.heading);

                        if (this.is_palce_exist([x, y])) {
                           this.$message({
                                message: "节点已存在",
                                type: "success"
                            });
                            return;
                        }
                        else {
                            this.current_road_data.places.push({
                                name: placename,
                                xy: [x, y],
                                yaw: yaw,
                            });
                        }
                        console.log("获取节点信息坐标成功", this.current_road_data.places);
                    } catch (e) {
                        console.log(e);
                    } finally {
                        console.log("获取节点finally");
                    }
                }
            });
        },

        modify_place() {
            let place = this.current_road_data.places[this.node_select];
            place.xy = [parseFloat(this.place_x), parseFloat(this.place_y)];
            place.yaw = parseFloat(this.yaw);
        },

        // place: input type:array [1,2]
        // return: Boolean
        is_palce_exist(place) {
            if (!Array.isArray(place))
                console.error("place require array:", typeof place);

            for (let val of this.road_places) {
                let x = parseFloat(val.xy[0]);
                let y = parseFloat(val.xy[1]);
                if (x === place[0] && y === place[1]) return true;
            }
            return false;
        },

        // line: input
        // return: { exist: boolean, index: number }
        find_road_line(line) {
            if (!$.isPlainObject(line))
                console.error("line require index object:", typeof line);
            let indextemp = 0;
            let result = { exist: false, index: NaN };
            for (let val of this.road_lines_index) {
                let head = parseInt(val.start);
                let tail = parseInt(val.end);
                if (line.start === head && line.end === tail) {
                    result.exist = true;
                    result.index = indextemp;
                    break;
                }
                indextemp++;
            }
            return result;
        },

        // map组件数据更新渲染
        data_to_map(map, places, lines, autozoom) {
            map.places = places; //map相当于roadMap实例然后map.places、map.lines调用属性
            map.lines = lines;
            if (autozoom) {
                let centor = calcCentor(places);
                map.map.getView().setCenter(centor);
                map.map.getView().setZoom(2);
            }

            function calcCentor(places) {
                let centor = [0, 0];
                places.forEach(val => {
                    centor[0] += parseFloat(val.xy[0]);
                    centor[1] += parseFloat(val.xy[1]);
                });
                centor[0] /= places.length;
                centor[1] /= places.length;
                return centor;
            }
        },
        manual_data_to_map() {
                this.data_to_map(this.$refs.roadMap, this.road_places , this.road_lines, true)
        },

        // 地图文件数据，属性校验
        async check_road_data_props(content) {
            if ($.isPlainObject(content)) {
                let props = ["places", "lines", "linesIndex"];
                for (let val of props) {
                    if (!content.hasOwnProperty(val))
                        console.error(val, "property is not object");
                    if (!Array.isArray(content[val]))
                        console.error(val, "property is not array");
                }
            }
        },
        // 地图文件列表，属性校验
        async check_road_name_props(content) {
            if (!Array.isArray(content))
                return console.error("road name list is not array");
            content.forEach(val => {
                if (typeof val !== "string")
                    console.error("road name list is not array");
            });
        },

        async pull_road_data_by_name() {
            // {file: ""}
            let name = this.selected_roads;
            let url = "/api/agv/fileManager/getRoadData";
            let data = { file: name };
            this.$http.post(url, data).then(response => {
                if (response.status !== 200) {
                    return alert("获取地图数据失败");
                }
                this.check_road_data_props(response.data);
                this.current_road_data = response.data;
                this.current_road_data_check = JSON.parse(JSON.stringify(response.data));
                this.manual_data_to_map();
            });
        },

        async pull_road_names_list() {
            let url = "api/agv/fileManager/getFileList";
            let data = { src: "local", type: "road" };
            this.$http.post(url, data).then(response => {
                if (response.status !== 200) {
                    return alert("获取地图文件失败");
                }
                this.check_road_name_props(response.data);
                this.road_names_list = response.data;
            });
        }
    },
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    beforeRouteLeave(to, from, next) {
        if (!_.isEqual(this.current_road_data, this.current_road_data_check)) {
            this.$confirm("检测到未保存的内容，是否在离开页面前保存修改？", "确认信息", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "保存",
                    cancelButtonText: "放弃修改"
                })
                .then(() => {
                    this.save_road_data();
                    this.$message({ type: "info", message: "保存修改" });
                    next();
                })
                .catch(action => {
                    this.$message({
                        type: "info",
                        message:action === "cancel" ? "放弃保存并离开页面": "停留在当前页面"
                    });

                    next(action === "cancel")
                });
        }else {
            next();
        }
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: -15px;
}
.el-col {
    padding-left: 20px;
}
</style>
