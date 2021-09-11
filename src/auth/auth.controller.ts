import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '登录',
    description:
      '登录成功后会获得令牌，在令牌有效期内使用该令牌的客户端都可以通过认证',
  })
  @ApiCreatedResponse({
    description: 'Token令牌',
    type: LoginResponse,
  })
  async login(@Request() req: any, @Body() body: LoginDto) {
    return this.authService.login(req.user._doc, body.expireTime ?? 604800);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '注销',
    description:
      '注销后会将当前token从可用列表中移除，所有使用该token的客户端都将丢失授权',
  })
  async logout(@Request() req: any, @Body() body: LogoutDto) {
    return this.authService.logout(body._id, req);
  }
}
