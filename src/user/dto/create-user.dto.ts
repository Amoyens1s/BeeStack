import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户名，唯一标识，可用于登录，可修改',
    example: 'Amoyensis',
    type: 'string',
  })
  readonly username: string;

  @ApiProperty({
    description:
      '密码，不小于8位，允许数字和大小写字母，可修改，储存的为加密后字符串',
    example: '0845A5972CD9AD4A46BAD66F1253581F',
    type: 'string',
  })
  readonly password: string;

  @ApiProperty({
    description: '绑定邮箱，唯一标识，可用于登录，可修改',
    example: 'username@example.com',
    type: 'string',
  })
  readonly email: string;

  @ApiProperty({
    description: '绑定手机号，唯一标识，可用于登录，可修改',
    example: '00000000000',
    type: 'number',
  })
  readonly phone?: number;

  @ApiProperty({
    description: '账号创建日期，不可修改',
    example: '2021/07/11',
    type: 'string',
  })
  readonly createDate: string;

  @ApiProperty({
    description: '用户权限',
    example: 'master',
    type: 'Array',
  })
  readonly role: string;

  @ApiProperty({
    description: '有效令牌',
    example: [],
    type: 'Array',
  })
  public token?: string[];
}
