import {Injectable , CallHandler, ExecutionContext, NestInterceptor, BadRequestException, ForbiddenException, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

export const Authentication = () => UseInterceptors(CurrentUserInterceptor)

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService : UsersService) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest()
        
        const {userId} = request.session
        if(!userId || isNaN(+userId)) throw new ForbiddenException('please login again')
        // if(userId) {
            const user = await this.userService.findUserById(+userId)
            if(!user) throw new ForbiddenException('please login again')
            request.userId = userId
        // }

        return next.handle()
    }
}