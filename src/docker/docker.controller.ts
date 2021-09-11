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
import { exec } from 'child_process';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { DockerService } from './docker.service';

@ApiTags('Docker模块')
@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}
  @Post()
  @ApiOperation({ summary: '创建新用户' })
  @ApiOkResponse({
    description: '新用户创建成功',
  })
  async create(@Res() res: Response, @Body() createUserDto: any) {
    const result = await this.dockerService.create(createUserDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('ps')
  @ApiOperation({ summary: 'Images List' })
  async findAll(@Res() res: Response) {
    const result = this.dockerService.docker.listImages();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取指定用户数据' })
  @ApiInternalServerErrorResponse({
    description: '查询不到指定用户',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.dockerService.findOne(id);
    return res.status(HttpStatus.OK).json({
      _id: result._id,
      username: result.username,
      email: result.email,
      phone: result.phone || null,
      createDate: result.createDate,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新指定用户' })
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.dockerService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定用户' })
  async remove(@Param('id') id: string) {
    return this.dockerService.remove(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: '获取指定用户数据' })
  async findOneByEmail(@Param('email') email: string) {
    return this.dockerService.findByEmail(email);
  }
}
