import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async create(orderDto: OrderDto) {
    const order = [];
    for (const ticket of orderDto.tickets) {
      const film = await this.filmsRepository.findFilmById(ticket.film);
      if (!film) {
        throw new Error(`Фильм ${ticket.film} не найден`);
      }
      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new Error(
          `Сеанс ${ticket.session} не найден для фильма ${ticket.film}`,
        );
      }
      const sessionPlace = `${ticket.row}:${ticket.seat}`;
      if (session.taken.includes(sessionPlace)) {
        throw new Error(
          `Место ${sessionPlace} уже занято в сеансе ${ticket.session}`,
        );
      }
      session.taken.push(sessionPlace);
      await this.filmsRepository.updateOrder(film.id, film.schedule);
      order.push(ticket);
    }
    return {
      total: order.length,
      items: order,
    };
  }
}
