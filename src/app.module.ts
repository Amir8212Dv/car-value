import { MiddlewareConsumer, Module , ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.entity';
import { Reports } from './reports/reports.entity';
import { APP_PIPE } from '@nestjs/core';
import { UsersService } from './users/users.service';
const cookieSession = require('cookie-session')



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true  // ==> this options makes our  environment variables accessable in whol application
    }) ,
    TypeOrmModule.forRoot({
    migrations : [],
    type : "postgres",
    database : process.env.POSTGRE_DATABASE,
    host : process.env.POSTGRE_HOST,
    port : parseInt(process.env.POSTGRE_PORT),
    password : process.env.POSTGRE_PASSWORD,
    username : process.env.POSTGRE_USERNAME,
    entities : [Users , Reports],
    synchronize : true
    }) , 
  UsersModule, ReportsModule
  ],
  providers : [
    {
      provide : APP_PIPE,
      useValue : new ValidationPipe({
        whitelist : true
      })
    }
  ]
})
export class AppModule {
  configure(consumer : MiddlewareConsumer) {
    consumer.apply(cookieSession({
      keys : ['cookieSessionSecreteKey']
  })).forRoutes('*')
  }
}

