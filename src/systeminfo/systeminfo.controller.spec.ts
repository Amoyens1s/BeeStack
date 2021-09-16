import { Test, TestingModule } from '@nestjs/testing';
import { SysteminfoController } from './systeminfo.controller';
import { SysteminfoService } from './systeminfo.service';

describe('SysteminfoController', () => {
  let controller: SysteminfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysteminfoController],
      providers: [SysteminfoService],
    }).compile();

    controller = module.get<SysteminfoController>(SysteminfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
