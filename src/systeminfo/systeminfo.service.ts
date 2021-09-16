import { Injectable } from '@nestjs/common';
import { cpu } from 'systeminformation';

@Injectable()
export class SysteminfoService {
  get cpuInfo() {
    return cpu();
  }
}
