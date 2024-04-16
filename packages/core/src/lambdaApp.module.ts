import { Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true
    })
  ],
})
export class LambdaAppModule {
  static forRoot(providers: Array<Provider>) : LambdaAppModule {
    providers.push(ConfigService);
    providers.push(Logger);
    return {
      module: LambdaAppModule,
      providers: providers,
      exports: providers,
    };
  }
}
