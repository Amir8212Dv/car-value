import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports : [TypeOrmModule.forFeature([Users])] ,
  controllers: [UsersController],
  providers: [
    UsersService , 
    AuthService ,
    CurrentUserInterceptor,
    // { // by providing interceptor like this , this  interceptor  will be  apply to all routes in user module , even the routes we don't need authentication
    //   provide : APP_INTERCEPTOR,
    //   useClass : CurrentUserInterceptor
    // }
  ]
})
export class UsersModule {}
