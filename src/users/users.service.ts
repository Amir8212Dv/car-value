import { Injectable , NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';

interface BodyType {
    email : string
    password : string
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private repo : Repository<Users>) {}

    async createUser(body : BodyType) {
        const {email , password} = body
        const user = this.repo.create({email , password})
        
        await this.repo.save(user)

        return user
    }
    async findUserById(id : number) {
        const user = await this.repo.findOne({where : {id}})
        if(!user) throw new NotFoundException(`user with id ${id} not found`)
        return user
    }
    async findUserByEmail(email : string) {
        return this.repo.findOne({where : {email}})

    }
    async updateUserById(id : number , updateData : Partial<Users>) {
        const user = await this.findUserById(id)
        if(!user) throw new NotFoundException(`user with id ${id} not found`)

        Object.assign(user , updateData)

        await this.repo.save(user)
    }
    async deleteUserById(id : number) {
        const user = await this.findUserById(id)
        if(!user) throw new NotFoundException(`user with id ${id} not found`)

        await this.repo.remove(user)
    }
}
