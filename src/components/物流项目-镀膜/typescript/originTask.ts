import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class RoadLine {
    @PrimaryColumn()
    id: number;

    @Column('double')
    x: number;

    @Column('double')
    y: number;

    @ManyToOne(type => RoadMapNodes, roadMapNodes => roadMapNodes.roadLine)
    roadMapNodes: RoadMapNodes;
}

@Entity()
export class RoadNodes {
    @PrimaryColumn()
    node: number;

    @Column('json')
    todo: any;

    @Column('json')
    goods: any;

    @Column()
    tag: number;

    @ManyToOne(type => Content, content => content.roadNodes)
    content: Content;
}

@Entity()
export class RoadMapNodes {
   @PrimaryColumn()
   state: number;

   @OneToMany(type => RoadLine, roadLine => roadLine.roadMapNodes)
   roadLine: RoadLine[];

   @Column()
   startTime: string;

   @Column()
   endTime: string;

   @Column()
   checkTime: string;

   @Column()
   message: string;

   @ManyToOne(type => Process, process => process.roadNodes)
   process: Process;
}

@Entity()
export class Content {
    @PrimaryColumn()
    roadMap: string;
    
    @OneToMany(type => RoadNodes, roadNodes => roadNodes.content)
    roadNodes: RoadNodes[];

    @ManyToOne(type => AGVTask, agvtask => agvtask.content)
    agvtask: AGVTask;
}

@Entity()
export class Process {
    @PrimaryColumn()
    roadMap: string;
    
    @OneToMany(type => RoadMapNodes, roadMapNodes => roadMapNodes.process)
    roadNodes: RoadMapNodes[];
    
    @Column()
    nodeIndex: number;
    
    @Column()
    carId: string;
    
    @Column()
    startTime: string;
    
    @Column()
    endTime: string;

    @ManyToOne(type => AGVTask, agvtask => agvtask.process)
    agvtask: AGVTask;
}

@Entity()
export class AGVTask {
    @PrimaryColumn()
    primaryId: string;

    @Column()
    clusterId: string;
    
    @Column()
    pubTime: string;
    
    @Column()
    schedule: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    type: string;

    @Column()
    stepIndex: number;

    @OneToMany(type => Content, content => content.agvtask)
    content:  Content[];

    @OneToMany(type => Process, process => process.agvtask)
    process: Process[];
}