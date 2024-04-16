import { INestApplicationContext, Logger, LoggerService, LogLevel, Provider } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LambdaAppModule } from '../lambdaApp.module';

export class BaseAPIGatewayHandler{
    
    app: INestApplicationContext | null;
    logger: LoggerService | null;
    providers: Provider[];

    constructor(providers : Provider[]){
        this.providers = providers;
        this.app = null;
        this.logger = null;
    }

    async warmup() {
        await this.bootstrap();
    }

    async bootstrap() {
        var logLevel = process.env.LOG_LEVEL as LogLevel;
        //TODO
        const httpTransportOptions = {
            host: 'http-intake.logs.datadoghq.com',
            path: '/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=nodejs&service=<APPLICATION_NAME>',
            ssl: true
          };
        var logger = WinstonModule.createLogger({
            level: logLevel,
            transports: [
                new winston.transports.Console(),
                new winston.transports.Http(httpTransportOptions),
                // other transports...
            ],
        });

        this.app = await NestFactory.createApplicationContext(
            LambdaAppModule.forRoot(this.providers), 
            {
                logger: logger
            });
        this.logger = this.app.get(Logger);
        
        //await this.app.init();
    }

    async handleRequest(event: APIGatewayEvent, context: Context) : Promise<any> {
    }

    async lambdaHandler (event: APIGatewayEvent, context: Context) : Promise<APIGatewayProxyResult> {
        await this.bootstrap();
        this.logger.debug(context.awsRequestId);
        this.logger.debug(JSON.stringify(event, null, 2), 'Received event:');
        
        try {
            var result = await this.handleRequest(event, context);

            if (typeof result === 'string'){
                result  = { data : result };
            }

            var stringifiedResult = JSON.stringify(result)
            
            this.logger.debug(`Return result: ${stringifiedResult}`);

            return {
                headers:{ "Content-Type": "application/json"},
                statusCode: 200,
                body: stringifiedResult,
            };

        } catch (error) {

            this.logger.error(error);

            return {
                headers:{ "Content-Type": "application/json"},
                statusCode: 500,
                body: ""
            };
        }
        
    };
}