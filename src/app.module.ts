import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.entity';
import { Reports } from './reports/reports.entity';




@Module({
  imports: [
    ConfigModule.forRoot() ,
    TypeOrmModule.forRoot({
    migrations : [],
    type : "postgres",
    database : process.env.POSTGRE_DATABASE,
    host : process.env.POSTGRE_HOST,
    port : parseInt(process.env.POSTGRE_PORT),
    password : process.env.POSTGRE_PASSWORD,
    username : process.env.POSTGRE_USERNAME,
    entities : [Users , Reports],
    synchronize : true,
  }) , 
  UsersModule, ReportsModule]
})
export class AppModule {}
