import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser, LoginUser } from './DTO/auth.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("sign-up")
  async signup(@Body() user: CreateUser) {
    return await this.authService.signUp(user)
  }
  @Post("login")
  async login(@Body() user: LoginUser) {
    return await this.authService.login(user)
  }
  @Post("refresh")
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken)
  }
  @UseGuards(AuthGuard)
  @Get("auth")
  check() {
    return "is Authencated"
  }
}
