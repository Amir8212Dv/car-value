import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports : [TypeOrmModule.forFeature([Users])] ,
  controllers: [UsersController],
  exports : [UsersService],
  providers: [
    UsersService , 
    AuthService ,
    // { // by providing interceptor like this , this  interceptor  will be  apply to all routes in user module , even the routes we don't need authentication
    //   provide : APP_INTERCEPTOR,
    //   useClass : CurrentUserInterceptor
    // }
  ]
})
export class UsersModule {
  configure(consumer : MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
