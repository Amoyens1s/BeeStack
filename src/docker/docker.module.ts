import { RolesGuard } from '../auth/guards/roles.guard';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { DockerController } from './docker.controller';
import { DockerService } from './docker.service';
import { DockerSchema } from './docker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'docker', schema: DockerSchema }]),
  ],
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
