import { Column } from "vxe-table";

export abstract class Content {
    @PrimaryGeneratedColum()
    id: number;

    @Column()
    title: String;

}

export class Question extends Content {
    
}