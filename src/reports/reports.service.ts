import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { Reports } from './reports.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Reports) private repo : Repository<Reports>) {}

    async createReport(data : CreateReportDto , user : Users) {
        // const user = await this.userService.findUserById(userId)
        const report = this.repo.create({...data , user})
        await this.repo.save(report)
        return report
    }
    async getAllReports() {
        const reports = await this.repo.createQueryBuilder("report")
        // .innerJoin('report.user' , 'user')
        .select('*')
        .getRawMany()
        return reports
    }
    async changeReportApproval(id : number , approve : boolean) {
        const report = await this.repo.findOne({where : {id}})
        if(!report) throw new NotFoundException(`report with id ${id} not found`)

        report.approve = approve
        await this.repo.save(report)
    }
}
