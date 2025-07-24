import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, Schedule, FilmDocument } from 'src/films/schema/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private readonly filmModel: Model<FilmDocument>,
  ) {}

  async findAllFilms() {
    return this.filmModel.find({});
  }
  async findFilmById(id: string) {
    return this.filmModel.findOne({ id })
  }
}
