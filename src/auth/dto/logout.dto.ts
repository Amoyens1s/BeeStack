import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({
    description: '用户ID',
    example: '60fbddda6804aa2caca2cd96',
    type: 'string',
  })
  readonly _id: string;
}
