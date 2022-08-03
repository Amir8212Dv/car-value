import { Reports } from 'src/reports/reports.entity'
import { Entity , Unique , Column , PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id : number
    @Column({unique : true})
    email : string
    @Column()
    password : string
    @OneToMany(() => Reports , report => report.user)
    reports : Reports[]
    @Column({default : true})
    admin : boolean
}