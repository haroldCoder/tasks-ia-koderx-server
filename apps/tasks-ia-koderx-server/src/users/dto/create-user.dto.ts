import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'juan@ejemplo.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'User cellphone number',
    example: '+1234567890',
    required: false,
  })
  celphone?: string;

  @ApiProperty({
    description: 'Username',
    example: 'koderx',
    required: true,
  })
  username: string;
}
