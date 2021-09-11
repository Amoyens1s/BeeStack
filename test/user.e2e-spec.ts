import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET all users)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect([
        {
          _id: '60eb06a2219d7a491cbd249b',
          username: 'Amoyensis',
          password: '0845A5972CD9AD4A46BAD66F1253581F',
          email: 'username@example.com',
          phone: '00000000000',
          createDate: '2021/07/11',
          __v: 0,
        },
      ]);
  });
});
