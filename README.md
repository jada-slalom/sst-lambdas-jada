## Description

[SST](https://docs.sst.dev/)
[NestJS](https://github.com/nestjs/nest)


## Installation

```bash
$ npm install
```

## Debug and test your Lambda functions locally

```bash
# Starts the Live Lambda Development environment.
$ npm run dev
```

## Deploy
```bash
$ npm run deploy
```



# Build Project

API-First Appoach

1. Update swagger.yaml under /packages/core with your new endpoint defination
   
   follow the Guide here
   https://swagger.io/docs/specification/basic-structure/

2. Generate types from swagger file and load to project

   ```bash
   $ npm run openapi
   ```

3. Create enpoint lambda handler file. The file name need to match the swagger operationId
   
handler template
```
export class TestHandler extends BaseAPIGatewayHandler {
  constructor(){
    // load services
    // add your service at lambdas/src/providers.ts
    super(providers);
  }

  // business logic
  async handleRequest(event: APIGatewayEvent, context: Context)
  : Promise<Clients> // replace the return type with corresponding Swagger response type
  {
    var service = this.app?.get(TestService);
    var client: Client = {
      id: 1,
      name: service.getHello()
    };
    return [client];
  };
}

// lambda entry point
export const handler = async (event: any, context: Context) =>
  await new TestHandler().lambdaHandler(event, context);
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```