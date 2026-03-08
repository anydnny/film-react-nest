import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, Schedule } from 'src/films/schema/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<Film>,
  ) {}

  async findAllFilms(): Promise<Film[]> {
    return this.filmModel.find({});
  }
  async findFilmById(id: string): Promise<Film | null> {
    return this.filmModel.findOne({ id });
  }
  async updateOrder(filmId: string, schedule: Schedule[]): Promise<void> {
    await this.filmModel.updateOne({ id: filmId }, { $set: { schedule } });
  }
}
