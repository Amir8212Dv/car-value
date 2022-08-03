import { Expose, Transform, Type , } from "class-transformer"
import { Reports } from "../reports.entity"
// import {Field} from '@nestjs/'

export class ReportResponseDto {
    @Expose()
    id : number
    @Expose()
    price : number
    @Expose()
    make : string
    @Expose()
    model : string
    @Expose()
    year : number
    @Expose()
    lng : number
    @Expose()
    lat : number
    @Expose()
    milages : number
    @Expose()
    approve : boolean
    // @Transform(({obj}) => obj.user.id || obj.userId)
    // @Expose()
    // userId : number
}

export class AllReportsResponseDto {
    @Type(() => ReportResponseDto)
    reports : ReportResponseDto[]
}