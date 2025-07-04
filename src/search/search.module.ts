import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtServiceUtils } from 'utils/jwtToken/tokens';

@Module({
  imports: [PrismaModule],
  controllers: [SearchController],
  providers: [SearchService, PrismaService, JwtServiceUtils],

})
export class SearchModule { }
