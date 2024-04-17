import { FunctionProps, StackContext } from "sst/constructs";
import { esbuildOptions } from "../esbuild.options";

export function LambdaStack({ app, stack }: StackContext) : Record<string, FunctionProps> {
  
  // lambda layer, 
  // once the lambda script becomes too big, we can use layer to store node_modules
  // const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayer", {
  //   code: lambda.Code.fromAsset("layers/nestjs"),
  // });

  const testHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/testHandler.handler",
    environment: {
      LOG_LEVEL: "debug",
    },
    nodejs: {
      esbuild: esbuildOptions
    }
  };

  const getClientByIdHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientByIdHandler.handler",
    layers:[
      // nestjslayer,  //attach layer
    ]
  };

  return {
    testHandler,
    getClientByIdHandler,
  }
}
