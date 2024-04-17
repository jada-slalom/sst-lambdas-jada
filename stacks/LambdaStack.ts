import { FunctionProps, StackContext } from "sst/constructs";
import { esbuildOptions } from "../esbuild.options";
import { aws_lambda as lambda } from "aws-cdk-lib"

export function LambdaStack({ app, stack }: StackContext) : Record<string, FunctionProps> {
  
  const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayer", {
    code: lambda.Code.fromAsset("layers/nestjs"),
  });

  const testHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/testHandler.handler",
    environment: {
      LOG_LEVEL: "debug",
    },
    nodejs: {
      esbuild: esbuildOptions
    },
    layers:[
      nestjslayer,
    ]
  };

  const getClientByIdHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientByIdHandler.handler",
    nodejs: {
      esbuild: esbuildOptions
    },
    layers:[
      nestjslayer,
    ]
  };

  return {
    testHandler,
    getClientByIdHandler,
  }
}
