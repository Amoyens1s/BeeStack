import { Test, TestingModule } from '@nestjs/testing';
import { response } from '@test/test';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('AppController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await controller.findAll(response)).toStrictEqual([]);
    });
  });
});
