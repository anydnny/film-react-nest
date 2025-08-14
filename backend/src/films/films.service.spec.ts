import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilmEntity } from './entities/films.entity';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(FilmEntity),
          useValue: {}, // Мок-репозиторий
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
