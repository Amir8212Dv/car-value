import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { plainToClass } from 'class-transformer'
import { UserResponseDto } from 'src/users/dto/user-response.dto'

interface ClassContrutor {
    new (...args : any[]) : {}       // ==> any class type
}

export const serialize = (dto : ClassContrutor) => {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto : ClassContrutor) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // for run something before request goes into the request handler , write that here

        return next.handle().pipe(
            map((value : any , index : number) => {
                // for run something before response goes to the client , then write it here
                return plainToClass(this.dto , value , {excludeExtraneousValues : true})
            })
        )
    }
}