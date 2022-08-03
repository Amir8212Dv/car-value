import { CanActivate , ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

// this is a way of  check authentication in nextjs
// in this method , we have to return something , if that was  true/truthy  then route is accessable , but if the return value was  flase/falsy , then client can't access to that route
// (absolutly we can use authentication method that we've used in express applications by throwing errors manually)
// for use  guard  in routes , we have to do this :  @UseGuard(GUARD_NAME)

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()

        return request.user
    }
}