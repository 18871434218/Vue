export interface Todo {
    action: number,
    target: number,
    direction: number,
    endLevel: number
};

export interface Goods {
    type: number,
    weight: number
}; 

export interface Point {
    node: number,
    todo: Todo,
    goods: Goods,
    tag: number
};

export interface NodeState {
    state: string,
    roadLine: any,
    startTime: Date,
    endTime: Date,
    checkTime: Date,
    message: string 
}

export interface Roadnode {
    node: number,
    action: number,
    target: number
}

export interface Content {
    roadMap: string,
    roadNodes: Roadnode[],
}

export interface Mission {
    type: string,
    repeat: number,
    content: Content[]
}
