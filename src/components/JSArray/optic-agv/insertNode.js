const InsertNode = async(content) => {
    const insertNodes = [
        {
            node: 9,
            todo: { action: 1, target: 1, direction: 1, endLevel: 1 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 10,
            todo: { action: 2, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 11,
            todo: { action: 1, target: 1, direction: 1, endLevel: 1 },
            goods: { type: 0, weight: 10 }
        },
        {
            node: 13,
            todo: { action: 2, target: 1, direction: 1, endLevel: 0 },
            goods: { type: 0, weight: 10 }
        }
    ];
    // 目前是俩个区域差点
    const roadMapA = content[0].roadMap;
    const roadMapB = content[1].roadMap;
    if (roadMapA < roadMapB) {
        content[0].roadNodes.push(insertNodes[0]);
        content[1].roadNodes.unshift(insertNodes[1]);
    } else {
        content[0].roadNodes.push(insertNodes[2]);
        content[1].roadNodes.unshift(insertNodes[3]);
    }

    for (const contentAera of content) {
        
    }
    return content;
};