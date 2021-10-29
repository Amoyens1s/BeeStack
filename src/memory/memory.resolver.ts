import { Resolver, Query, Args } from '@nestjs/graphql';
import { MemoryTimeSeries } from './memory.interface';
import { MemoryService } from './memory.service';

@Resolver('Memory')
export class MemoryResolver {
  constructor(private readonly memoryService: MemoryService) {}
  @Query('memory')
  async getMemory() {
    return this.memoryService.getMemory();
  }

  @Query('memoryTimeSeries')
  async getMemoryTimeSeries(
    @Args('from') from: number,
    @Args('to') to: number,
  ) {
    const res = await this.memoryService.getMemoryTimeSeries(from, to);
    const result: MemoryTimeSeries[] = [];
    res.forEach((item) => {
      result.push({
        timestamp: item.timestamp,
        usage: item.usage,
        used: item.used,
        total: item.total,
      });
    });
    return result;
  }
}
