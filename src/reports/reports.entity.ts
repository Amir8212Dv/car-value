import { Column , PrimaryGeneratedColumn , Entity } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    price : number
}