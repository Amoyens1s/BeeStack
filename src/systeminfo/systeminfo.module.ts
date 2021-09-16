import { Module } from '@nestjs/common';
import { SysteminfoService } from './systeminfo.service';
import { SysteminfoController } from './systeminfo.controller';

@Module({
  controllers: [SysteminfoController],
  providers: [SysteminfoService]
})
export class SysteminfoModule {}
