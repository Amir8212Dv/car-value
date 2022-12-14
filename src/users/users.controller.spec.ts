import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService : Partial<UsersService>
  let fakeAuthService : Partial<AuthService>

  beforeAll(async () => {
    fakeUserService = {
      findUserById(id) {
        return Promise.resolve({email : '', password : '' , id})
      },updateUserById(id, updateData) {
        return Promise.resolve()
      },deleteUserById(id) {
        return Promise.resolve()
      },
    }
    fakeAuthService = {
      signin(email, password) {
        return Promise.resolve({email , password , id : 1})
      },
      signup(email, password) {
        return Promise.resolve({email , password , id : 1})
      },
    }
  })
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers : [
        {
          provide : UsersService,
          useValue : fakeUserService
        },
        {
          provide : AuthService,
          useValue : fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Get user by id' , async () => {
    const user = await controller.getUserById('1')

    expect(user).toBeDefined()
    expect(user.id).toBe(1)
  })
  it('Get Profile' , async () => {
    const user = await controller.getProfile(undefined , 1)

    expect(user).toBeDefined()
  })
  it('Get profile with no user id' , () => {
    expect(controller.getProfile(undefined , 0)).rejects.toThrowError(new BadRequestException('please login first'))
  })
  it('Update user' , async () => {
    const {message} = await controller.updateUserById('1' , {email : 'newTestEmail@test.com' , password : 'newTestPassword'})

    expect(message).toBe('user updated successfully')
  })
  it('Delete user' , async () => {
    const {message} = await controller.deleteUserById('1')
    expect(message).toBe('user deleted successfully')
  })
  it('Sign in' , async () => {
    const user = await controller.signin({email : 'test@test.com' , password : 'testPassword'} , {})
    expect(user).toBeDefined()
  })
  it('Sign in while already signed in' , async () => {
    expect(controller.signin({email : 'test@test.com' , password : 'testPassword'} , {userId : 1}))
    .rejects
    .toThrowError(new BadRequestException('you are already loged in'))
  })
  it('Sign up' , async () => {
    const user = await controller.signup({email : 'test@test.com' , password : 'testPassword'} , {})
    expect(user).toBeDefined()
  })
  it('Sign up while already signed in' , async () => {
    expect(controller.signup({email : 'test@test.com' , password : 'testPassword'} , {userId : 1}))
    .rejects
    .toThrowError(new BadRequestException('you are already loged in'))
  })
  it('sign out' , async () => {
    const {message} = await controller.signout({userId : 1})
    expect(message).toBe('you loged out successfully')
  })
});
