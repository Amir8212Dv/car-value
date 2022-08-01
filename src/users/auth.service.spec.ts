import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { CreateUserDto } from './dto/create_user.dto'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { hashPassword } from '../utils/hashPassword'

describe('AuthService' , () => {  //describe  method , just gives a better description for our test
    let service : AuthService
    let fakeUserService : Partial<UsersService>
    
    beforeEach(async () => {  // runs this function , before each  it(){}  function
        fakeUserService = {
            findUserById : (id : number) => Promise.resolve({id , email : '' , password : ''}),
            createUser : (body : CreateUserDto) => Promise.resolve({id : 1 ,  email : body.email , password : body.password}),
            findUserByEmail : (email : string) => Promise.resolve(null)
        }
        const module = await Test.createTestingModule({
            providers : [
                AuthService,
                {
                    provide : UsersService,
                    useValue : fakeUserService
                }
            ]
        }).compile()
        service = module.get(AuthService)
    })
    it('can create an instance of user service' , async () => {
    
        expect(service).toBeDefined()
    })
    it('sign up as a new user' , async () => {
        const testingPassword = 'testingPassword'
        const user = await service.signup('testSignup@gmail.com' , testingPassword)
    
        expect(user.password).not.toEqual(testingPassword)
        expect(user.email).toBeDefined()
        expect(user.id).toBeDefined()
    })
    
    it('sign up with existing email' , async () => {
        fakeUserService.findUserByEmail = (email : string) => Promise.resolve({id : 1 , email : '' , password : ''})
        expect(service.signup('testSignup@gmail.com' , 'adsf')).rejects.toThrowError(new BadRequestException('this email already used'))
        
    })
    
    it('sign in with invalid email' , () => {
        expect(service.signin('' , '')).rejects.toThrowError(new BadRequestException('email or password is wrong'))
    })
    
    it('sign in with valid email' , async () => {
        const testPassword = 'testPassword'
        fakeUserService.findUserByEmail = (email : string) => Promise.resolve({id : 1 , email : 'test@gmail.com' , password : hashPassword(testPassword)})
        const user = await service.signin('test@gmail.com' , testPassword)
        expect(user).toBeDefined()
    })
    
    it('sign in with wrong password' , () => {
        fakeUserService.findUserByEmail = (email : string) => Promise.resolve({id : 1 , email : 'test@gmail.com' , password : '$2b$08$K8FJ6dKpEhMuGf7sMx4xeeEUvVYdlwYVnyuUuPg5UQh8z4EBkR0kO'})
        expect(service.signin('test@gmail.com' , 'testPassword1')).rejects.toThrowError(new BadRequestException('email or password is wrong'))
    })
})


