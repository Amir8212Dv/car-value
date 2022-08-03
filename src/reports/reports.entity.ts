import { Users } from "src/users/users.entity";
import { Column , PrimaryGeneratedColumn , Entity, ManyToOne } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    price : number
    @Column()
    make : string
    @Column()
    model : string
    @Column()
    year : number
    @Column()
    lng : number
    @Column()
    lat : number
    @Column()
    milages : number
    @Column({default : false})
    approve : boolean
    @ManyToOne(() => Users , user => user.reports , {onDelete : 'CASCADE'})
    user : Users
}