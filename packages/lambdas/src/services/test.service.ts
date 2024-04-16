import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestService {
  
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService,
    ) {
    }

  getHello(): string {
    this.logger?.debug(this.configService?.get<string>('API_LINK'));
    return 'Hello GL!';
  }
}
