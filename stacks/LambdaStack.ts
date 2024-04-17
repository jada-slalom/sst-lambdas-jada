import { aws_lambda as lambda } from "aws-cdk-lib";
import { FunctionProps, StackContext } from "sst/constructs";
import { environments } from "../config";
import { esbuildOptions } from "../esbuild.options";

/**
 * @Return  property keys are handler file names and values are FunctionProps
 */
export function LambdaStack({
  app,
  stack,
}: StackContext): Record<string, FunctionProps> {
  const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayerJada", {
    code: lambda.Code.fromAsset("layers/nestjs"),
  });

  app.addDefaultFunctionEnv(environments);
  // must be called before any stack with functions have been added to the application
  app.setDefaultFunctionProps({
    nodejs: {
      esbuild: esbuildOptions,
    },
    layers: [nestjslayer],
  });

  // Add handlers

  const getClientsHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientsHandler.handler",
    environment: {
      // add handler level environment here
      LOG_LEVEL: "debug",
    },
    nodejs: {
      esbuild: esbuildOptions,
    },
    layers: [nestjslayer],
  };

  const getClientByIdHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientByIdHandler.handler",
    nodejs: {
      esbuild: esbuildOptions,
    },
    layers: [nestjslayer],
  };

  // { "{file name}": FunctionProps }
  return {
    testHandler: getClientsHandler,
    getClientByIdHandler,
  } as Record<string, FunctionProps>;
}
