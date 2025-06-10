import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersRoutes, version } from './routes/users.routes';

@Controller(version)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(usersRoutes.getUser)
  @ApiOperation({ summary: 'Get a user by email or cellphone' })
  @ApiParam({ name: 'term', required: true, description: 'Email or cellphone number of the user' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserByEmailOrCelphone(@Param("term") term: string){
    return this.usersService.getUSerByEmailOrCelphone(term)
  }

  @Post(usersRoutes.login)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'User logged successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'User bad request' })
  login(@Body() user: CreateUserDto){
    return this.usersService.LoginUser(user)
  }

  @Patch(usersRoutes.updateUser)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'term', required: true, description: 'Email or cellphone number of the user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  updateUser(@Param("term") term: string, @Body() user: UpdateUserDto){
    return this.usersService.updateUser(user, term)
  }
}