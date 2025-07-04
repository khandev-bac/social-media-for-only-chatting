import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Get(":id")
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId)
  }
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id)
  }
}
