import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity, ScheduleEntity } from './entities/films.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmsRepository: Repository<FilmEntity>,
  ) {}

  async getAllFilms(): Promise<{ total: number; films: FilmEntity[] }> {
    const [total, films] = await Promise.all([
      this.filmsRepository.count(),
      this.filmsRepository.find({
        relations: {
          schedule: true,
        },
      }),
    ]);
    return { total, films };
  }

  async getFilmById(
    id: string,
  ): Promise<{ total: number; films: ScheduleEntity[] }> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });

    if (!film) {
      throw new NotFoundException(`Такой фильм не найден`);
    }

    return { total: film.schedule.length, films: film.schedule };
  }
}
