import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { JwtModule } from '@nestjs/jwt';
import { SearchModule } from './search/search.module';
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core"
@Module({
  imports: [

    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),

    JwtModule.register({
      global: true
    }),

    UserModule,
    AuthModule,
    PrismaModule,
    SearchModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
