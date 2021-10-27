import { Resolver, Query } from '@nestjs/graphql';
import { MemoryService } from './memory.service';

@Resolver('Memory')
export class MemoryResolver {
  constructor(private readonly memoryService: MemoryService) {}
  @Query('memory')
  async getMemory() {
    return this.memoryService.getMemory();
  }
}
