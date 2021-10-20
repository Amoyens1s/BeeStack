import { Injectable } from '@nestjs/common';
import { mem } from 'systeminformation';

@Injectable()
export class MemoryService {
  async getMemory() {
    return await mem();
  }
}
