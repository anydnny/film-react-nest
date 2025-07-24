import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getFilmById(id: string) {
    const film = await this.filmsRepository.findFilmById(id);
    if (!film) {
      throw new NotFoundException(`Такой фильм не найден`);
    }
    return film;
  }
}
