import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonModeLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    return JSON.stringify({
      level,
      message,
      optionalParams,
      timestamp: new Date().toISOString(),
    });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

}
