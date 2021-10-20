import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryResolver } from './memory.resolver';

@Module({
  providers: [MemoryResolver, MemoryService],
})
export class MemoryModule {}
