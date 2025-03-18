import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  async authenticate(@Body() userData: { name: string; email: string; phoneNumber: string }) {
    return this.userService.authenticate(userData);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateData: { name?: string; email?: string; phoneNumber?: string },
  ) {
    return this.userService.updateUser(userId, updateData);
  }
}