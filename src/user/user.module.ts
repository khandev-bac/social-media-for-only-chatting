import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtServiceUtils } from 'utils/jwtToken/tokens';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, JwtServiceUtils],
})
export class UserModule { }
