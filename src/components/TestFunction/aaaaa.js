defaultTaskData:
       [
         {
            taskId: '20DFDFJYWYYY', // 任务ID(唯一)
            taskType: 'coating', // 任务类型
            preTaskId: '0', //上一个任务ID
            boxId: 'boxid1', // 箱子ID
            content: [ // 任务类型
                {
                    area: 'A', //  区域名称
                    roadNodes: [ // 该区域需要执行任务的路网节点
                        {
                            node: 1, // 节点序号
                            todo: { // 执行指令
                                type: 'LIFT',
                                action: 11, // 1：取货 2：放货
                                target: 1, // 1：货架1层  2: 货架2层  3：货架3层  4：传送带
                                direction: 1, // 1：左方向   2：右方向
                                endLevel: 0 // 动作结束的判断等级   0：机器自动判断结束   1：必须由操作人员扫码判定结束
                            },
                            goods: { // 货物属性
                                type: 0, // 货物类型
                                weight: 0 // 货物重量
                            }
                        }
                    ],
                    repeat: 1 // 该区域此指令执行的重复次数
                },
                {
                    area: 'B',
                    roadNodes: [
                        {
                            node: 0,
                            todo: {
                                type: 'LIFT',
                                action: 11,
                                target: 1,
                                direction: 1,
                                endLevel: 0
                            },
                            goods: {
                                type: 0,
                                weight: 0
                            }
                        }
                    ],
                    repeat: 1
                }
            ]
        }
      ],