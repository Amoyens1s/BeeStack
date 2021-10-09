import { Controller, Get } from '@nestjs/common';
import { CPUService } from './cpu.service';

@Controller('cpu')
export class CPUController {
  constructor(private readonly cpuService: CPUService) {}

  @Get('usage')
  getCPUInfo() {
    return this.cpuService.usage;
  }
}
