import { FunctionProps, StackContext } from "sst/constructs";
import { environments } from "../config";
import { esbuildOptions } from "../esbuild.options";


/**
 * @Return  property keys are handler file names and values are FunctionProps
*/
export function LambdaStack({ app, stack }: StackContext) : Record<string, FunctionProps> {
  
  // lambda layer, 
  // once the lambda script becomes too big, we can use layer to store node_modules
  // const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayer", {
  //   code: lambda.Code.fromAsset("layers/nestjs"),
  // });

  app.addDefaultFunctionEnv(environments);
  // must be called before any stack with functions have been added to the application
  app.setDefaultFunctionProps({
    nodejs: {
      esbuild: esbuildOptions
    }
  });

  // Add handlers

  const getClientsHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientsHandler.handler",
    environment: {
      // add handler level environment here
      LOG_LEVEL: "debug",
    }
  };

  const getClientByIdHandler: FunctionProps = {
    handler: "packages/lambdas/src/handlers/getClientByIdHandler.handler",
    layers:[
      // nestjslayer,  //attach layer
    ]
  };

  // { "{file name}": FunctionProps }
  return {
    testHandler: getClientsHandler,
    getClientByIdHandler,
  } as Record<string, FunctionProps>
}
