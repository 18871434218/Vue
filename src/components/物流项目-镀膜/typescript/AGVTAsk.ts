import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Content } from './Content';
import { Process } from './Process';

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