import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userDto: any) {
    return this.userService.signup(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const token = await this.userService.login(loginDto);
      return { message: 'Login successful', token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}