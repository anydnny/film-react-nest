import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity, ScheduleEntity } from 'src/films/entities/films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
