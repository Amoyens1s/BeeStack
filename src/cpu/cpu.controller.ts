import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CPUService } from './cpu.service';

@ApiTags('CPU')
@Controller('cpu')
export class CPUController {
  constructor(private readonly cpuService: CPUService) {}

  @Get('usage')
  @ApiOperation({
    summary: 'CPU使用率',
  })
  getCPUusage() {
    return this.cpuService.usage;
  }
}
