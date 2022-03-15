import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { DockerService } from './docker.service';

@ApiTags('Docker模块')
@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('ps')
  @ApiOperation({ summary: '列出所有容器' })
  async listContainers(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(await this.dockerService.dockerode.listContainers());
  }

  @Get('ps/all')
  @ApiOperation({ summary: '列出所有容器' })
  async findAll(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(
      await this.dockerService.dockerode.listContainers({
        all: true,
      }),
    );
  }
}
