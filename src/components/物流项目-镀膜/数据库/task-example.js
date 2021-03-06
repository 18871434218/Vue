module.exports = 
{	
    primaryId: "20DFDFJYW-20201106104445",					   	//任务编号
    clusterId: "",										       	//任务集群编号（关联循环任务）
    pubTime: "",									   	   		//任务发布时间
    schedule: "",											    //任务计划时间
    startTime: "",    										    //任务开始时间
    endTime: "",											    //任务完成时间
    type: "",								            //任务类型
    stepIndex: 0,											    //任务当前执行阶段
    content: [									           	    //任务内容
        {
            roadMap: "",										//路网名称
            roadNodes: [							          	//当前阶段任务经过的目标节点
                {
                    node: 1,						          	//节点名称
                    todo: { 						           	//操作相关合集
                        action: 11, 				           	//具体动作
                        target: 1, 					           	//目标点
                        direction: 1, 				           	//方向
                        endLevel: 0 				           	//确认等级
                    },
                    goods: { 						           	//物料相关合集
                        type: 0, 					           	//物料类型
                        weight: 10 					           	//物料重量
                    },
                    tag: 0									   	//插入点相关
                },
                {
                    node: 2,
                    todo: { 
                        action: 11,
                        target: 1,
                        direction: 1,
                        endLevel: 0 
                    },
                    goods: { 
                        type: 0, 
                        weight: 10 
                    },
                    tag: 0
                }
            ]
        }
    ],

    process: [										           	//任务执行状态记录
        {
            roadMap: "001",							           	//路网名称
            roadNodes: [									   	//当前阶段任务经过的目标节点
                {
                                                                //'wait','lock','process','finish','error'
                    state: "process",						     	//节点当前状态
                    roadLine: [{ id: 10, x: 102.8, y: 32.6}], 			//目标点间经过的路径
                    startTime: "",								//节点机器开始时间
                    endTime: "",				   	   		   	//节点机器完成时间
                    checkTime: "",				       		   	//节点确认完成时间
                    message: ""						   		   	//节点信息记录
                },
                {
                    state: "wait",
                    roadLine: [{ "id": 10, "x": 102.8, "y": 32.6}],
                    startTime: "",
                    endTime: "",
                    checkTime: "",
                    message: ""
                }
            ],
            nodeIndex: 0,									   	//当前阶段执行的节点下标
            carId: "001",									   	//执行车辆的编号
            startTime: "", 							   		//车辆发布时间
            endTime: ""								   			//车辆完成任务时间
        }
    ]
}