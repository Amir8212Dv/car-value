import { CanActivate , ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        if(!user) return false
        return user.admin
    }
}