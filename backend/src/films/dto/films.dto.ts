//TODO описать DTO для запросов к /films
import { IsArray, IsNumber, IsString } from 'class-validator';

export class FilmDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsArray()
  tags: string[];
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  cover: string;
  @IsArray()
  schedule: ScheduleDto[];
}

export class ScheduleDto {
  @IsString()
  id: string;

  @IsString()
  daytime: Date;

  @IsNumber()
  hall: number;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  taken: string[];
}
