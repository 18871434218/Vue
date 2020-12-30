// 前端想要的数据
{
    code:200,
    value:
    [
        { 
            area: 'A',
            nodes: [{id: 1, where: [2, 3] , status: 'idle'},{id:'', where: [2, 3] , status: 'idle'}], 
            lines: [{id: 2, start: [2, 3] , end: [2,4], state: true },{id:'', start: [2, 3] , end: [2,4], state: 'free', isBiDir: false }]
        },
        { 
            area: 'B',
            nodes: [{id: 3, where: [2, 3] , status: 'idle'}, {id:'', where: [2, 3] , status: 'idle'}], 
            lines: [{id: 4, start: [2, 3] , end: [2,4], state: true}, {id:'', start: [2, 3] , end: [2,4], state: 'free', isBiDir: false }]
        }
    ]
}



roadMap = [ 
    { map_name: 'A', lane_state: response.lane_state, lane: lane },
    { map_name: 'A', lane_state: response.lane_state, lane: lane },
    { map_name: 'A', lane_state: response.lane_state, lane: lane },
    { map_name: 'B', lane_state: response.lane_state, lane: lane },
    { map_name: 'B', lane_state: response.lane_state, lane: lane },
    { map_name: 'B', lane_state: response.lane_state, lane: lane },
    { map_name: 'C', lane_state: response.lane_state, lane: lane },
    { map_name: 'C', lane_state: response.lane_state, lane: lane },
    { map_name: 'C', lane_state: response.lane_state, lane: lane }, 
];

roadMap = [
    {
        map_name: 'A',
        nodes: [{id: 1, where: [2, 3] , status: 'idle'},{id:'', where: [2, 3] , status: 'idle'}], 
        lines: [{id: 2, start: [2, 3] , end: [2,4], state: true },{id:'', start: [2, 3] , end: [2,4], state: 'free', isBiDir: false }]
    },
    {
        map_name: 'A',
        nodes: [{id: 1, where: [2, 3] , status: 'idle'},{id:'', where: [2, 3] , status: 'idle'}], 
        lines: [{id: 2, start: [2, 3] , end: [2,4], state: true },{id:'', start: [2, 3] , end: [2,4], state: 'free', isBiDir: false }]
    }
]  

// grpc返给我的数据
lane = { 
    lane_sum: 101,
    map_sum: 2,
    map_name: 'B',
    lane_state: 'free',
    lane: {
        lane_id: 104,
        BN: {
            NID: 50,
            x: 58.79999923706055,
            y: 22,
            yaw: 0,
            description: 'WorkPoint'
        },
        FN: {
            NID: 85,
            x: 58.79999923706055,
            y: 20.170000076293945,
            yaw: 0,
            description: 'RoadPoint4_2'
        },
        shape: {
            lane_type: 'line',
            p1: 0,
            p2: 0,
            hdg: 0,
            length: 1.8300000429153442
        },
        info: {
            speed: 20,
            motion_type: 1,
            obstacle_avoid: false,
            extra_cost: 0,
            qr_code: false,
            infrared: true,
            heading: 1
        }
    }
}


roadMap = [ 
            { map_name: 'A', lane_state: response.lane_state, lane: lane },
            { map_name: 'A', lane_state: response.lane_state, lane: lane },
            { map_name: 'A', lane_state: response.lane_state, lane: lane },
            { map_name: 'B', lane_state: response.lane_state, lane: lane },
            { map_name: 'B', lane_state: response.lane_state, lane: lane },
            { map_name: 'B', lane_state: response.lane_state, lane: lane },
            { map_name: 'C', lane_state: response.lane_state, lane: lane },
            { map_name: 'C', lane_state: response.lane_state, lane: lane },
            { map_name: 'C', lane_state: response.lane_state, lane: lane },  
        ];