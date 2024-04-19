import { BaseAPIGatewayHandler } from '@payment/core';
import { Client, Clients } from '@payment/openapi';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { providers } from '../providers';
import { TestService } from '../services/test.service';

export class GetClientsHandler extends BaseAPIGatewayHandler {
  constructor(){
    super(providers);
  }

  async handleRequest(event: APIGatewayEvent, context: Context) : Promise<Clients> {
    var service = this.app?.get(TestService);
    var client: Client = {
      id: 1,
      name: service.getHello(),
      //@ts-ignore
      test: process.env.JADA_TEST_SECRET,
    };
    return [client];
  };
}

// lambda entry point
export const handler = async (event: any, context: Context) =>
  await new GetClientsHandler().lambdaHandler(event, context);
