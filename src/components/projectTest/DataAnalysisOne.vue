<template>
    <el-row align="middle">
        <el-col id="props_block">
            <el-row id="prop_tips">定位配置信息</el-row>
            <el-row type="flex" justify="space-between" style="margin-left:40px">
                <el-col :span="4">
                    <el-row class="proptype">图层最低高度</el-row>
                    <el-row class="proptype">图层最高高度</el-row>
                    <el-row class="proptype">点云搜索范围</el-row>
                    <el-row class="proptype">雷达旋转中心距</el-row>
                    <el-row class="proptype">匹配阈值</el-row>
                    <el-row class="proptype">地图路径</el-row>
                </el-col>
                <el-col :span="14">
                    <el-row class="proptype">{{locate_old.trim_low}}</el-row>
                    <el-row class="proptype">{{locate_old.trim_high}}</el-row>
                    <el-row class="proptype">{{locate_old.farPointThreshold}}</el-row>
                    <el-row class="proptype">{{locate_old.robot_distance}}</el-row>
                    <el-row class="proptype">{{locate_old.trans_probability}}</el-row>
                    <el-row class="proptype">{{locate_old.globalmap_pcd}}</el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="locate_new.trim_low"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="locate_new.trim_high"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="locate_new.farPointThreshold"
                        ></el-input-number>
                    </el-row>

                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="locate_new.robot_distance"
                        ></el-input-number>
                    </el-row>

                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="locate_new.trans_probability"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="globalmap_pcd_tail"
                        ></el-input>
                    </el-row>
                     
                    <el-row> 
                        <el-button
                            type="primary"
                            size="mini"
                            :disabled="selected_car==null"
                            @click="save_locate_change()"
                        >确认修改</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

        <el-col id="props_block">
            <el-row id="prop_tips">规划配置信息</el-row>
            <el-row type="flex" justify="space-between" style="margin-left:40px">
                <el-col :span="4">
                    <el-row class="proptype">车辆长度</el-row>
                    <el-row class="proptype">车辆宽度</el-row>
                    <el-row class="proptype">采样间隔-X</el-row>
                    <el-row class="proptype">采样间隔-Y</el-row>
                    <el-row class="proptype">通行宽度</el-row>
                    <el-row class="proptype">制动距离</el-row>
                    <el-row class="proptype">采样间隔</el-row>
                    <el-row class="proptype">避障开关</el-row>
                </el-col>
                <el-col :span="14">
                    <el-row class="proptype">{{plan_old.common.veh_length}}</el-row>
                    <el-row class="proptype">{{plan_old.common.veh_width}}</el-row>
                    <el-row class="proptype">{{plan_old.trajectory_generator.x_sample_interval}}</el-row>
                    <el-row class="proptype">{{plan_old.trajectory_generator.y_sample_interval}}</el-row>
                    <el-row class="proptype">{{plan_old.global_planner.margin}}</el-row>
                    <el-row class="proptype">{{plan_old.path_selector.dis_brake}}</el-row>
                    <el-row class="proptype">{{plan_old.trajectory_generator.length}}</el-row>
                    <el-row class="proptype">{{plan_old.trajectory_generator.enable_avoiding}}</el-row>
                </el-col>

                <el-col :span="6">
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.common.veh_length"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.common.veh_width"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.trajectory_generator.x_sample_interval"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.trajectory_generator.y_sample_interval"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.global_planner.margin"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.path_selector.dis_brake"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.trajectory_generator.length"
                        ></el-input-number>
                    </el-row>
                    <el-row>
                        <el-switch
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="plan_new.trajectory_generator.enable_avoiding"
                            inactive-text="关"
                            active-text="开"
                        ></el-switch>
                    </el-row>
                     
                    <el-row>
                        <el-button
                            size="mini"
                            type="primary"
                            :disabled="selected_car==null"
                            @click="save_plan_change()"
                        >确认修改</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>

        <el-col id="props_block">
            <el-row id="prop_tips">构图配置信息</el-row>
            <el-row type="flex" justify="space-between" style="margin-left:40px">
                <el-col :span="4">
                    <el-row class="proptype">pose3d</el-row>
                    <el-row class="proptype">pose6d</el-row>
                    <el-row class="proptype">key_path</el-row>
                    <el-row class="proptype">key_framnam</el-row>
                    <el-row class="proptype">globalmap_pcd</el-row>
                </el-col>
                <el-col :span="14">
                    <el-row class="proptype">{{mapping_old.pose3d}}</el-row>
                    <el-row class="proptype">{{mapping_old.pose6d}}</el-row>
                    <el-row class="proptype">{{mapping_old.key_path}}</el-row>
                    <el-row class="proptype">{{mapping_old.key_framnam}}</el-row>
                    <el-row class="proptype">{{mapping_old.globalmap_pcd}}</el-row>
                </el-col>
                <el-col :span="6">
                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="mapping_new.pose3d"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="mapping_new.pose6d"
                        ></el-input>
                    </el-row>
                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="mapping_new.key_path"
                        ></el-input>
                    </el-row>

                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="mapping_new.key_framnam"
                        ></el-input>
                    </el-row>

                    <el-row>
                        <el-input
                            size="mini"
                            :disabled="selected_car==null"
                            v-model="mapping_new.globalmap_pcd"
                        ></el-input>
                    </el-row>

                    <el-row>
                       <el-button
                        size="mini"
                        type="primary"
                        :disabled="selected_car==null"
                        @click="save_mapping_change()"
                    >确认修改</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        props: ["selected_car"],

        watch: {
            selected_car() {
                this.load_yaml_setting();
            },

            locate_new(val) {
                let globalmap_pcd = val.globalmap_pcd;
                if (globalmap_pcd) {
                    let ret = globalmap_pcd.split("/");
                    if (Array.isArray(ret) && ret.length) {
                        let tail = ret[ret.length - 1];
                        this.globalmap_pcd_tail = tail;
                        this.globalmap_pcd_head = globalmap_pcd.replace(tail, "");
                    }
                } else {
                    this.globalmap_pcd_head = null;
                    this.globalmap_pcd_tail = null;
                    /* this.globalmap_pcd_head = '';
                    this.globalmap_pcd_tail = ''; */
                }
            },

            mapping_new(val) {},

            globalmap_pcd_new(val) {
                this.locate_new.globalmap_pcd = JSON.parse(JSON.stringify(val));
            },
        },
        computed: {
            globalmap_pcd_new: function () {
                return this.globalmap_pcd_head + this.globalmap_pcd_tail;
            },
        },

        data() {
            return {
                plan_old: {
                    common: {},
                    global_planner: {},
                    trajectory_generator: {},
                    path_selector: {},
                },
                plan_new: {
                    common: { veh_length: null, veh_width: null },
                    global_planner: {
                        localPathFile: null,
                        enableSmoothing: null,
                        enableAutoPlan: null,
                        enableRvizShow: null,
                        pathDensity: null,
                        margin: null,
                    },
                    trajectory_generator: {
                        length: "",
                        slope: null,
                        multi_size: null,
                        control_type: "",
                        check_width: null,
                        check_length: null,
                        x_sample_interval: "",
                        y_sample_interval: "",
                        enable_slow_check: null,
                        enable_smoothing: null,
                        enable_avoiding: null,
                        enable_rviz_show: null,
                        enable_detect_end: null,
                        generate_frequency: null,
                    },
                    path_selector: {
                        dis_brake: "",
                        obstacle_factor: null,
                        center_factor: null,
                        angle_factor: null,
                    },
                },
                locate_old: {},
                locate_new: {
                    trim_low: null,
                    trim_high: null,
                    globalmap_pcd: null,
                    robot_distance: null,
                    trans_probability: null,
                    farPointThreshold: null,
                },

                globalmap_pcd_head: null,
                globalmap_pcd_tail: null,

                mapping_old: {},
                mapping_new: {
                    pose3d: null,
                    pose6d: null,
                    key_path: null,
                    key_framnam: null,
                    globalmap_pcd: null,
                },
            };
        },
        methods: {
            async switchTocar() {
                try {
                    if (this.selected_car == null) return false;
                    let url = "/api/agv/fileManager/switchToCar";
                    let data = { carId: this.selected_car };
                    let response = await this.$http.post(url, data);
                    return response.status === 200;
                } catch (err) {
                    return false;
                }
            },

            async load_yaml_setting() {
                if (await this.switchTocar()) {
                    this.load_locate_props();
                    this.load_plan_props();
                    this.load_mapping_prpos();
                } else {
                    alert("车辆连接失败");
                }
            },

            async load_locate_props() {
                let url = "/api/agv/onlineAdjust/readYamlConfig";
                let temp = { id: this.selected_car, type: "locate" };
                this.$http.post(url, temp).then((response) => {
                    if (response.status != 200) {
                        console.log("load_yaml_setting error!");
                    } else {
                        this.locate_old = response.data;
                        this.locate_new = JSON.parse(JSON.stringify(response.data));
                    }
                });
            },

            async load_plan_props() {
                let url = "/api/agv/onlineAdjust/readYamlConfig";
                let temp = { id: this.selected_car, type: "plan" };
                this.$http.post(url, temp).then((response) => {
                    if (response.status != 200) {
                        console.log("load_yaml_setting error!");
                    } else {
                        this.plan_old = response.data;
                        this.plan_new = JSON.parse(JSON.stringify(response.data));
                    }
                });
            },

            async load_mapping_prpos() {
                let url = "/api/agv/onlineAdjust/readYamlConfig";
                let temp = { id: this.selected_car, type: "mapping" };
                this.$http.post(url, temp).then((response) => {
                    if (response.status != 200) {
                        console.log("load_yaml_setting error!");
                    } else {
                        this.mapping_old = response.data;
                        this.mapping_new = JSON.parse(
                            JSON.stringify(response.data)
                        );
                    }
                });
            },

            async save_locate_change() {  
                if (await this.push_locate_config()) {
                    this.emit_reload_sylocation();
                    console.log("save locate config OK");
                } else {
                    console.log("save locate config error");
                }
            },

            async save_plan_change() {
                if (await this.push_plan_config()) {
                    this.emit_reload_road();
                } else {
                    console.log("save plan config error");
                }
            },

            async save_mapping_change() {
                if (await this.push_mapping_config()) {
                    console.log("save mapping config OK");
                } else {
                    console.log("save plan config error");
                }
            },

            async push_locate_config() {
                let url = "/api/agv/onlineAdjust/writeYamlConfig";
                let data = { type: "locate", data: this.locate_new };
                let response = await this.$http.post(url, data);
                
                //倒计时消息
                var a = this.$message({
                    showClose: false,
                    message: '定位算法正在启动5s后配置完成',
                    type: "error",
                    duration: 5000
			     });
			
                //倒计时函数
                function coutTime(index){
                    setTimeout(function() {
                        if(index == 0){
                            //5s结束后的操作
                        }else{
                            a.message = "定位算法正在启动"+index+"s后配置完成" ;
                            coutTime(--index) ;
                        }
                    }, 1000);
                };
                coutTime(4);


                if (response.status != 200) {
                    console.log("save_props_change error!");
                    return false;
                } else {
                    // update old locate to show
                    this.locate_old = JSON.parse(JSON.stringify(this.locate_new));
                    return true;
                }
            },

            async push_plan_config() {
                let url = "/api/agv/onlineAdjust/writeYamlConfig";
                let data = { type: "plan", data: this.plan_new };
                let response = await this.$http.post(url, data);
                    
                var a = this.$message({
                    showClose: false,
                    message: '规划算法正在启动5s后配置信息完成',
                    type: "error",
                    duration: 5000
			     });
			
                //倒计时函数
                function coutTime(index){
                    setTimeout(function() {
                        if(index == 0){
                              //5s结束后的操作
                        }else{
                            a.message = "规划算法正在启动"+index+"s后配置信息完成" ;
                            coutTime(--index) ;
                        }
                    }, 1000);
                };
                coutTime(4);
    

                if (response.status != 200) {
                    console.log("save_props_change error!");
                    return false;
                } else {
                    // update old plan to show
                    this.plan_old = JSON.parse(JSON.stringify(this.plan_new));
                    return true;
                }
            },

            async push_mapping_config() {
                let url = "/api/agv/onlineAdjust/writeYamlConfig";
                let data = { type: "mapping", data: this.mapping_new };
                let response = await this.$http.post(url, data);
                if (response.status != 200) {
                    console.log("push_mapping_config error!");
                    return false;
                } else {
                    // update old locate to show
                    this.mapping_old = JSON.parse(JSON.stringify(this.mapping_new));
                    return true;
                }
            },

            async emit_reload_sylocation() {
                let url = "/api/agv/onlineAdjust/carExec";
                let data = {
                    id: this.selected_car,
                    func: "reloadSyLocation",
                    flag: true,
                };
                this.$http.post(url, data).then((response) => {
                    if (response.status != 200) {
                        console.log("emit_reload_map error!");
                    }
                });
            },

            async emit_reload_road() {
                let url = "/api/agv/onlineAdjust/carExec";
                let data = {
                    id: this.selected_car,
                    func: "reloadRoad",
                    flag: true,
                };
                this.$http.post(url, data).then((response) => {
                    if (response.status != 200) {
                        console.log("emit_reload_road error!");
                    }
                });
            },
        },
    };
</script>

<style>
    .el-col {
        padding-left: 0px;
    }
</style>>

<style scoped>
    #props_block {
        margin-top: 10px;
        background: rgba(255, 255, 255, 0.1);
    }
    #prop_tips {
        font-size: 16px;
        height: 20px;
        min-width: 150px;
    }
    .proptype {
        font-size: 16px;
        margin-top: 10px;
    }
    .el-input-number {
        height: 18px;
        width: 150px;
        font-size: 16px;
        margin-top: 10px;
    }
    .el-input {
        height: 18px;
        width: 150px;
        font-size: 16px;
        margin-top: 10px;
    }
    .el-switch {
        font-size: 16px;
        margin-top: 10px;
    }
    .el-button {
        margin-left: 180px;
        margin-top: 3px;
    }
</style>
