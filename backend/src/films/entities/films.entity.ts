import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsNumber()
  rating: number;
  @Column()
  @IsString()
  director: string;
  @Column()
  @IsString()
  tags: string;
  @Column()
  @IsString()
  title: string;
  @Column()
  @IsString()
  about: string;
  @Column()
  @IsString()
  description: string;
  @Column()
  @IsString()
  image: string;
  @Column()
  @IsString()
  cover: string;
  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsDate()
  daytime: Date;
  @Column()
  @IsNumber()
  hall: number;
  @Column()
  @IsNumber()
  rows: number;
  @Column()
  @IsNumber()
  seats: number;
  @Column()
  @IsNumber()
  price: number;
  @Column()
  @IsString()
  taken: string;
  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  film: FilmEntity;
}
