import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { serialize } from 'src/interceptor/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { AuthGuard } from 'src/users/guard/Auth.guard';
import { RoleGuard } from 'src/users/guard/role.guard';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AllReportsResponseDto, ReportResponseDto } from './dto/report-response.dto';
import { updateReportApproveDto } from './dto/update-report-approve.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private service : ReportsService , private userService : UsersService) {}

    @Post('/create')
    @UseGuards(AuthGuard)
    @serialize(ReportResponseDto)
    async createReport(@Body() body : CreateReportDto , @CurrentUser() user : Users ) {
        const report = await this.service.createReport(body , user)
        return report
    }
    @Get('/all')
    // @serialize(AllReportsResponseDto)
    async getAllReports() {
        const reports = await this.service.getAllReports()
        return reports
    }
    @Patch('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(RoleGuard)
    async approveReport(@Param('id') id : string , @Body() body : updateReportApproveDto) {
        return this.service.changeReportApproval(+id , !!body.approve)
    }
}
