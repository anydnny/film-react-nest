import { TskvLogger } from './tskvMode.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка логгирования LOG и формат', () => {
    logger.log('Тестовое сообщение', 'Контекст Приложения');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(
        /^level=log\ttimestamp=.*\tmessage=Тестовое сообщение\tparam0="Контекст Приложения"$/,
      ),
    );
  });
});
