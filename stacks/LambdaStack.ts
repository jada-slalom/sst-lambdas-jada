import { StackContext, Function, StaticSite, Api } from "sst/constructs";
import { esbuildOptions } from "../esbuild.options";

export function LambdaStack({ stack }: StackContext) {
  
  // lambda layer, 
  // once the lambda script becomes too big, we can use layer to store node_modules
  // const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayer", {
  //   code: lambda.Code.fromAsset("layers/nestjs"),
  // });

  const testHandler = new Function(stack, `TestLambda`, {
    handler: "packages/lambdas/src/handlers/testHandler.handler",
    environment: {
      LOG_LEVEL: "debug",
    },
    nodejs: {
      esbuild: esbuildOptions
    }
  });

  const getClientByIdHandler = new Function(stack, `getClientByIdLambda`, {
    handler: "packages/lambdas/src/handlers/getClientByIdHandler.handler",
    environment: {
      LOG_LEVEL: "debug",
    },
    nodejs: {
      esbuild: {
        external: [
          "@nestjs/common", 
          "@nestjs/core", 
          "@nestjs/config",
          "@anyun-slalom/nest-lambda-core"
        ]
      }
    },
    layers:[
      // nestjslayer,  //attach layer
    ]
  });

  return {
    testHandler,
    getClientByIdHandler
  }
}
