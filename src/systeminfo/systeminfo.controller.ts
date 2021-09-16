import { Controller, Get } from '@nestjs/common';
import { SysteminfoService } from './systeminfo.service';

@Controller('systeminfo')
export class SysteminfoController {
  constructor(private readonly systeminfoService: SysteminfoService) {}

  @Get('cpu')
  getCPUInfo() {
    return this.systeminfoService.cpuInfo;
  }
}
