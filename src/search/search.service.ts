import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService) { }

    async searchUser(query: string) {
        return this.prisma.$queryRaw<Array<{
            id: string;
            name: string;
            email: string;
            bio: string | null;
            profilePic: string | null;
        }>>(Prisma.sql`
  SELECT id, name, email, bio, "profilePic"
  FROM "User"
  WHERE similarity(name, ${query}) > 0.2
  ORDER BY similarity(name, ${query}) DESC
  LIMIT 20;
`);


    }
}

