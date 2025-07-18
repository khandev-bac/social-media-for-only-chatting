import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect()
        console.log("Prisma connected")
    }
    async onModuleDestroy() {
        await this.$disconnect()
        console.log("Prisma disconnected");

    }

}

