import { JsonModeLogger } from './jsonMode.logger';

describe('JsonModeLogger', () => {
  let logger: JsonModeLogger;

  const textParam = 'Тестовое сообщение';
  const contextParam = 'Контекст Приложения';
  const errorParam = 'Stack Trace ошибки';

  beforeEach(() => {
    logger = new JsonModeLogger();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Проверка логгирования LOG', () => {
    logger.log(textParam, contextParam);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(callArg);

    expect(parsed).toEqual(
      expect.objectContaining({
        level: 'log',
        message: textParam,
        optionalParams: [contextParam],
      }),
    );
  });

  it('Проверка логгирования WARN', () => {
    logger.warn(textParam, contextParam);

    const callArg = (console.warn as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(callArg);

    expect(parsed).toEqual(
      expect.objectContaining({
        level: 'warn',
        message: textParam,
        optionalParams: [contextParam],
      }),
    );
  });

  it('Проверка логгирования ERROR', () => {
    logger.error(textParam, errorParam, contextParam);

    const callArg = (console.error as jest.Mock).mock.calls[0][0];
    const parsed = JSON.parse(callArg);

    expect(parsed).toEqual(
      expect.objectContaining({
        level: 'error',
        message: textParam,
        optionalParams: [errorParam, contextParam],
      }),
    );
  });
});
