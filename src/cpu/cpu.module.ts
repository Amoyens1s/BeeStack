import { Module } from '@nestjs/common';
import { CPUService } from './cpu.service';
import { CPUController } from './cpu.controller';

@Module({
  controllers: [CPUController],
  providers: [CPUService],
})
export class CPUModule {}
