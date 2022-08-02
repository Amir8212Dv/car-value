import {BadRequestException, Body, Controller , Delete, Get, Param, Patch, Post , Session } from '@nestjs/common';
import { serialize, SerializeInterceptor } from '../interceptor/serialize.interceptor';
import { CreateUserDto } from './dto/create_user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Authentication } from './interceptor/current-user.interceptor';

@Controller('auth')
export class UsersController {
    constructor(private userService : UsersService , private AuthService : AuthService) {}

    @Get('/profile')
    @Authentication()
    async getProfile (@Session() session : any , @CurrentUser() user : number) {
        if(!user) throw new BadRequestException('please login first')
        return this.userService.findUserById(user)
    }
    @serialize(UserResponseDto)
    @Post('/signup')
    async signup(@Body() body : CreateUserDto , @Session() session : any) {
        if(session && session.userId) throw new BadRequestException('you are already loged in')
        const user = await this.AuthService.signup(body.email , body.password)

        session.userId = user.id
        return user
    }
    @serialize(UserResponseDto)
    @Post('/signin')
    async signin(@Body() body : CreateUserDto , @Session() session : any){
        if(session.userId) throw new BadRequestException('you are already loged in')
        const user = await this.AuthService.signin(body.email , body.password)

        session.userId = user.id
        return user
    }
    @Post('/signout')
    @Authentication()
    async signout(@Session() session : any) {
        session.userId = undefined
        return {message : 'you loged out successfully'}
    }
    @serialize(UserResponseDto) // we can use this approach to hide some fields in return(we have to add @Entity() to field in entity file too)
    @Get('/:id')
    async getUserById(@Param('id') id : string) {
        return this.userService.findUserById(+id)
    }
    @Patch('/:id')
    async updateUserById(@Param('id') id : string , @Body() updateData : Partial<Users>) {
        await this.userService.updateUserById(+id , updateData)
        return {message : 'user updated successfully'}
    }
    @Delete('/:id')
    async deleteUserById(@Param('id') id : string) {
        await this.userService.deleteUserById(+id)

        return {message : 'user deleted successfully'}
    }
}
