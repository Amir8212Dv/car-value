import { IsBoolean } from "class-validator";

export class updateReportApproveDto {
    @IsBoolean()
    approve : Boolean
}