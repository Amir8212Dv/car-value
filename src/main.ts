import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({       ==> this way of configuring  cookieSession won't work in  e2e tests
  //   keys : ['cookieSessionSecreteKey']
  // }))
  // app.useGlobalPipes(new ValidationPipe({whitelist : true}))   ==> this way of setting global pipe won't work in e2e tests
  await app.listen(4000);
}
bootstrap();
