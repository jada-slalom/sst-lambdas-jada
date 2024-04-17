
import { APIGatewayEvent, Context } from 'aws-lambda';
import { GetClientsHandler } from "./getClientsHandler";

describe('GetClientsHandler', () => {
  let baseHandler: GetClientsHandler;
  beforeEach(async () => {
    baseHandler = new GetClientsHandler();
  });

  it('bootstrap', async() => {
    return await baseHandler.lambdaHandler({} as APIGatewayEvent, {} as Context);
  });
});
