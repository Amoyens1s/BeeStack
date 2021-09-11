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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserDetailDto } from './dto/user-detail.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/guards/roles.decorator';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ summary: '创建新用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({
    description: '新用户创建成功',
  })
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiOperation({ summary: '获取全部用户' })
  async findAll(@Res() res: Response) {
    const result = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(result);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取指定用户数据' })
  @ApiOkResponse({
    description: '用户数据，不包含password字段',
    type: UserDetailDto,
  })
  @ApiInternalServerErrorResponse({
    description: '查询不到指定用户',
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const result = await this.userService.findOne(id);
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定用户' })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: '获取指定用户数据' })
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
