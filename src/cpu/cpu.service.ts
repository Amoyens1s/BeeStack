import { Injectable } from '@nestjs/common';
import { currentLoad } from 'systeminformation';

@Injectable()
export class CPUService {
  get usage() {
    return currentLoad().then((res) => {
      return res.currentLoad;
    });
  }
}
