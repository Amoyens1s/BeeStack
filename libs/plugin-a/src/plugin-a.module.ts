import { Module } from '@nestjs/common';
import { PluginAService } from './plugin-a.service';

@Module({
  providers: [PluginAService],
  exports: [PluginAService],
})
export class PluginAModule {}
