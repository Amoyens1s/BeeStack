import { ApiProperty } from '@nestjs/swagger';

export class UserDetailDto {
  @ApiProperty({
    description: '用户名，唯一标识，可用于登录，可修改',
    example: 'Amoyensis',
    type: 'string',
  })
  readonly username: string;

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
  readonly phone: number;

  @ApiProperty({
    description: '账号创建日期，不可修改',
    example: '2021/07/11',
    type: 'string',
  })
  readonly createDate: string;
}
