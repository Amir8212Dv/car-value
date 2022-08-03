import {Injectable , CallHandler, ExecutionContext, NestInterceptor, BadRequestException, ForbiddenException, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

export const AuthGuard = () => UseInterceptors(CurrentUserInterceptor)

@Injectable() // interceptors are executing after guards in nestjs (middlware => guards => interceptrs) , and because of that , if we want to use something in guards that depends on interceptor , process will fail , and for fix that we can use middlwares
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService : UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest()
        
        const {userId} = request.session
        if(!userId || isNaN(+userId)) throw new ForbiddenException('please login again')
        const user = await this.userService.findUserById(+userId)
        if(!user) throw new ForbiddenException('please login again')
        request.user = user

        return next.handle()
    }
}