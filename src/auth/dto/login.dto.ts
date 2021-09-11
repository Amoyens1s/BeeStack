import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '登录名，可用邮箱和手机号登录',
    example: 'example@example.com',
    type: 'string',
  })
  readonly username: string;

  @ApiProperty({
    description: '登录密码',
    example: '123456',
    type: 'string',
  })
  readonly password: string;

  @ApiProperty({
    description: '登录有效期，单位为秒，不携带默认为604800（7天）',
    example: '604800',
    type: 'number',
  })
  readonly expireTime?: number;
}

export class LoginResponse {
  @ApiProperty({
    description: '登录成功获得的token',
    example: '60fbddda6804aa2caca2cd96',
    type: 'string',
  })
  readonly token: string;
}
