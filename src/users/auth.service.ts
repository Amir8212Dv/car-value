import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { validateHashedPassword } from "../utils/validateHashedPassword";
import { hashPassword } from "../utils/hashPassword";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
    constructor(private userService : UsersService) {}

    async signup(email : string , password : string) {
        const checkForUser = await this.userService.findUserByEmail(email)
        if(checkForUser) throw new BadRequestException('this email already used')

        const hashedPassword = hashPassword(password)
    
        const user = await this.userService.createUser({email , password : hashedPassword})
        return user
    }

    async signin(email: string , password : string) {
        const user = await this.userService.findUserByEmail(email)
        if(!user) throw new BadRequestException('email or password is wrong')
        const checkPassword = validateHashedPassword(user.password , password)
        if(!checkPassword) throw new BadRequestException('email or password is wrong')
        return user
    }
}