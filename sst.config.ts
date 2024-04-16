import { SSTConfig } from "sst";
import { LambdaStack } from "./stacks/LambdaStack";
import { APIStack } from "./stacks/APIStack";

export default {
  config(_input) {
    return {
      name: "payment",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(LambdaStack, { stackName: `${app.name}-lambdas-${app.stage}` });
    app.stack(APIStack, { stackName: `${app.name}-api-${app.stage}` });
  }
} satisfies SSTConfig;
