import { BaseAPIGatewayHandler } from '@payment/core';
import { Client } from '@payment/openapi';
import { APIGatewayEvent, Context } from 'aws-lambda';
import { providers } from '../providers';
import { TestService } from '../services/test.service';

export class GetClientByIdHandler extends BaseAPIGatewayHandler {
  constructor(){
    super(providers);
  }

  async handleRequest(event: APIGatewayEvent, context: Context) : Promise<Client> {
    var parameters = event.pathParameters;

    var id:number = Number(parameters["clientId"]);

    var service = this.app?.get(TestService);
    var pet: Client = {
      id: id,
      name: service.getHello()
    };
    return pet;
  };
}

//lambda entry point
export const handler = async (event: any, context: Context) =>
  await new GetClientByIdHandler().lambdaHandler(event, context);
