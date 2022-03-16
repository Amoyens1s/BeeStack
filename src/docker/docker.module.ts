import { RolesGuard } from '../auth/guards/roles.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DockerController } from './docker.controller';
import { DockerService } from './docker.service';
import { ConfigModule } from 'src/config';

@Module({
  imports: [ConfigModule],
  controllers: [DockerController],
  providers: [
    DockerService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [DockerService],
})
export class DockerModule {}
