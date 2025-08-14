import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmEntity } from '../films/entities/films.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmsRepository: Repository<FilmEntity>,
  ) {}

  async create(orderDto: OrderDto) {
    for (const ticket of orderDto.tickets) {
      const { film, session, row, seat } = ticket;

      const searchedFilm = await this.filmsRepository.findOne({
        where: { id: ticket.film },
        relations: { schedule: true },
      });

      if (!searchedFilm) {
        throw new Error(`Фильм ${film} не найден`);
      }

      const searchedSession = searchedFilm.schedule.find(
        (s) => s.id === session,
      );

      if (!searchedSession) {
        throw new Error(`Сеанс ${session} не найден для фильма ${film}`);
      }

      const sessionPlace = this.createSeatKey(row, seat);

      if (searchedSession.taken.includes(sessionPlace)) {
        throw new Error(`Место ${sessionPlace} уже занято в сеансе ${session}`);
      }

      if (searchedSession.taken) {
        searchedSession.taken = `${searchedSession.taken},${sessionPlace}`;
      } else {
        searchedSession.taken = sessionPlace;
      }

      await this.filmsRepository.save(searchedFilm);
    }

    return {
      total: orderDto.tickets.length,
      items: orderDto.tickets,
    };
  }

  createSeatKey(row: number, seat: number) {
    return `${row}:${seat}`;
  }
}
