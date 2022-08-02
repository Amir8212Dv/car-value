import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
describe('User Controller (e2e)', () => {
  const email = 'e2eTest@test.com'
  const password = 'e2ePasswordTest'
  let cookie : string[]
  let app: INestApplication;
  let createdUserId : number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup  @Post' , async () => {
    const {statusCode , body , headers} = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email , password})

    cookie = headers['set-cookie']
    expect(statusCode).toBe(201)
    expect(body.id).toBeDefined()
    expect(body.email).toBe(email)
    createdUserId = +body.id
  })
  it('/auth/signup  @Post (with existing email)' , async () => {
    const {statusCode , body} = await request(app.getHttpServer())
    .post('/auth/signup')
    .send({email , password})

    expect(statusCode).toBe(400)
    expect(body.message).toBe('this email already used')
  })
  it('/auth/profile , @Get (Authorized)' , async () => {
    const {statusCode , body} = await request(app.getHttpServer())
    .get('/auth/profile')
    .set('Cookie' , cookie)

    expect(statusCode).toBe(200)
    const {email : myEmail , id} = body
    expect(id).toBeDefined()
    expect(myEmail).toBe(email)
  })
  it('/auth/signout @Post' , async () => {
    const {statusCode , body} = await request(app.getHttpServer())
    .post('/auth/signout')
    .set('Cookie' , cookie)

    const {message} = body
    expect(statusCode).toBe(201)
    expect(message).toBe('you loged out successfully')

    cookie = []
  })
  it('/auth/profile @Get  (Not Authorized)' , async () => {
    const {statusCode , body} = await request(app.getHttpServer())
    .get('/auth/profile')

    expect(statusCode).toBe(403)
    expect(body.message).toBe('please login again')
  })
  it('/auth/signin @Post' , async() => {
    const {statusCode , body , headers} = await request(app.getHttpServer())
    .post('/auth/signin')
    .send({email , password})

    expect(statusCode).toBe(201)
    const {email : myEmail , id} = body
    expect(myEmail).toBe(email)
    expect(id).toBeDefined()

    cookie = headers['set-cookie']
  })
  it('/auth/:id @Delete' , async () => {
    const {statusCode , body} = await request(app.getHttpServer())
    .delete(`/auth/:${createdUserId}`)

    expect(statusCode).toBe(200)
    expect(body.message).toBe('user deleted successfully')
  })
});
