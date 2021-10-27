import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryResolver } from './memory.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'memory', schema: { autoCreate: false, autoIndex: false } },
    ]),
  ],
  providers: [MemoryResolver, MemoryService],
})
export class MemoryModule {}
