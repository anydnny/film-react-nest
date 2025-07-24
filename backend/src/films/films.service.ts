import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';
import { Film } from './schema/films.schema';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<Film[]> {
    return this.filmsRepository.findAllFilms();
  }

  async getFilmById(id: string): Promise<Film> {
    const film = await this.filmsRepository.findFilmById(id);
    if (!film) {
      throw new NotFoundException(`Такой фильм не найден`);
    }
    return film;
  }
}
