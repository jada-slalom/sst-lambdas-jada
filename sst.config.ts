import { SSTConfig } from "sst";
import { APIStack } from "./stacks/APIStack";
import { LambdaStack } from "./stacks/LambdaStack";

export default {
  config(_input) {
    return {
      name: "payment",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(LambdaStack, { stackName: `${app.name}-lambdas-${app.stage}` });
    app.stack((stack)=> APIStack(stack, 'packages/openapi/swagger.yaml'), { stackName: `${app.name}-api-${app.stage}` });
    
  }
} satisfies SSTConfig;
