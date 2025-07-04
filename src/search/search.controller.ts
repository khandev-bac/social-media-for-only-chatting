import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }
  @Get()
  async searchController(@Query('q') query: string) {
    if (!query || query.trim() === '') {
      return []
    }
    return this.searchService.searchUser(query)
  }
}
