import { swaggerToRoutes } from "@payment/openapi";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { Api, StackContext, use } from "sst/constructs";
import { esbuildOptions } from "../esbuild.options";
import { LambdaStack } from "./LambdaStack";

/**
 * Generate API from swagger.yaml
 *
 * @param stack StackContext
 * @param path path to your openapi yaml file
 */
export function APIStack({ app, stack }: StackContext, path: string) {
  var handlers = use(LambdaStack);
  // should replaced with SSTAPI from gl tool repo
  // which include gateway default setting, auth setting, etc.

  // need to figure out how to export layer from the LambdaStack,
  // but just creating a separate one for APIStack for now.
  const nestjslayer = new lambda.LayerVersion(stack, "nestjsLayer", {
    code: lambda.Code.fromAsset("layers/nestjs"),
  });

  var api = new Api(stack, `Api`);

  // load routes from swagger.yaml
  api.addRoutes(stack, swaggerToRoutes(path, handlers));

  // add open api links
  api.addRoutes(stack, {
    "GET /api": {
      authorizer: "none",
      function: {
        functionName: app.logicalPrefixedName("api"),
        handler: "packages/functions/openapiHandler.handler",
        nodejs: {
          esbuild: esbuildOptions,
        },
        layers: [nestjslayer],
      },
    },
    "GET /api-json": {
      authorizer: "none",
      function: {
        functionName: app.logicalPrefixedName("api-json"),
        handler: "packages/functions/openapiJsonHandler.handler",
        environment: {
          FILEPATH: path,
        },
        copyFiles: [{ from: path }],
        nodejs: {
          esbuild: esbuildOptions,
        },
        layers: [nestjslayer],
      },
    },
  });

  // add api health check
  api.addRoutes(stack, {
    "GET /health": {
      authorizer: "none",
      function: {
        functionName: app.logicalPrefixedName("health"),
        handler: "packages/functions/healthHandler.handler",
        nodejs: {
          esbuild: esbuildOptions,
        },
        layers: [nestjslayer],
      },
    },
  });

  stack.addOutputs({
    SiteUrl: api.url,
  });

  return api;
}
