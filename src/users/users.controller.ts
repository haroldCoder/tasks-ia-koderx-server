import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user/:term")
  @ApiOperation({ summary: 'Get a user by email or cellphone' })
  @ApiParam({ name: 'term', required: true, description: 'Email or cellphone number of the user' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserByEmailOrCelphone(@Param("term") term: string){
    return this.usersService.getUSerByEmailOrCelphone(term)
  }
}
