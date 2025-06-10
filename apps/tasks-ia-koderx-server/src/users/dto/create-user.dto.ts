import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'juan@ejemplo.com',
    required: false,
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User cellphone number',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  celphone?: string;

  @ApiProperty({
    description: 'Username',
    example: 'koderx',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}
