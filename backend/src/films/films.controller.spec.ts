import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmEntity } from './entities/films.entity';
import { Film } from './schema/films.schema';
import exp from 'constants';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  const mockFilmsRepo: Film[] = [
    {
      id: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
      rating: 8.1,
      director: 'Амелия Хьюз',
      tags: ['Рекомендуемые'],
      image: '/bg6s.jpg',
      cover: '/bg6c.jpg',
      title: 'Сон в летний день',
      about:
        'Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.',
      description:
        'Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?',
      schedule: [],
    },

    {
      id: '0354a762-8928-427f-81d7-1656f717f39c',
      rating: 9.5,
      director: 'Оливер Беннет',
      tags: ['Рекомендуемые'],
      image: '/bg4s.jpg',
      cover: '/bg4c.jpg',
      title: 'Парадокс Нексуса',
      about:
        'Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания',
      description:
        'В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.',
      schedule: [],
    },
  ];

  const mockFilmService = {
    getAllFilms: jest
      .fn()
      .mockResolvedValue({ total: mockFilmsRepo.length, items: mockFilmsRepo }),
    getFilmById: jest.fn().mockImplementation((id: string) => {
      const film = mockFilmsRepo.find((film) => film.id === id);
      return Promise.resolve({
        total: film ? 1 : 0,
        items: film ? [film] : [],
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Поиск всех фильмов', async () => {
    const result = await controller.getAllFilms();
    expect(result.items).toEqual(mockFilmsRepo);
    expect(service.getAllFilms).toHaveBeenCalled();
    expect(result.total).toBe(2);
  });

  it('Поиск фильма по ID', async () => {
    const filmId = '92b8a2a7-ab6b-4fa9-915b-d27945865e39';
    const result = await controller.getFilmById(filmId);
    expect(result.items[0].id).toEqual(filmId);
    expect(service.getFilmById).toHaveBeenCalledWith(filmId);
  });
});
