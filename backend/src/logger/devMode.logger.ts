import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevModeLogger extends ConsoleLogger {}
