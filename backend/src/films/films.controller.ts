import { Controller, Param, Get } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getAllFilms() {
    const filmsList = await this.filmService.getAllFilms();
    return {
      total: filmsList.length,
      items: filmsList,
    };
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string) {
    const film = await this.filmService.getFilmById(id);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
