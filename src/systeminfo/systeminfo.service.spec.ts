import { Test, TestingModule } from '@nestjs/testing';
import { SysteminfoService } from './systeminfo.service';

describe('SysteminfoService', () => {
  let service: SysteminfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysteminfoService],
    }).compile();

    service = module.get<SysteminfoService>(SysteminfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
