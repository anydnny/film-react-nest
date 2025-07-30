import { Controller, Param, Get } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getAllFilms() {
    return this.filmService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string) {
    return this.filmService.getFilmById(id);
  }
}
