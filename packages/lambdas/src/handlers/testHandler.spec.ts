
import { TestHandler } from "./testHandler";
import { APIGatewayEvent, Context } from 'aws-lambda';

describe('TestHandler', () => {
  let baseHandler: TestHandler;
  beforeEach(async () => {
    baseHandler = new TestHandler();
  });

  it('bootstrap', async() => {
    return await baseHandler.lambdaHandler({} as APIGatewayEvent, {} as Context);
  });
});
