import { Body, Controller , Post } from '@nestjs/common';
import { createUserDto } from './dto/create_user.dto';

@Controller('auth')
export class UsersController {
    @Post('/signup')
    async createUser(@Body() body : createUserDto) {
        console.log(body)
    }
}
