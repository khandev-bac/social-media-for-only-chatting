import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  getHello() {
    return `${process.env.DATABASE_URL}`
  }

}

