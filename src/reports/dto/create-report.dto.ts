import { IsNumber , IsLongitude , IsArray , IsString, Max, Min, IsLatitude } from 'class-validator'

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    price : number

    @IsString()
    make : string

    @IsString()
    model : string

    @Max(+(new Date().getFullYear()))
    @Min(1900)
    @IsNumber()
    year : number

    @IsNumber()
    @IsLongitude()
    lng : number

    @IsNumber()
    @IsLatitude()
    lat : number

    @IsNumber()
    @Max(1e6)
    @Min(0)
    milages : number

}