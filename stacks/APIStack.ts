import { swaggerToRoutes } from "@payment/openapi";
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

  var api = new Api(stack, `Api`, {
      defaults: {
        function: {
          nodejs: {
            esbuild: esbuildOptions
          }
        },
      }
    });

  // load routes from swagger.yaml
  api.addRoutes(stack, swaggerToRoutes( path, handlers));

  // add open api links
  api.addRoutes(stack, {
    'GET /api': {
      authorizer: 'none',
      function : {
        functionName: app.logicalPrefixedName('api'),
        handler: 'packages/functions/openapiHandler.handler',
      }
    },
    'GET /api-json': {
      authorizer: 'none',
      function: {
        functionName: app.logicalPrefixedName('api-json'),
        handler: 'packages/functions/openapiJsonHandler.handler',
        environment:{
          FILEPATH: path
        },
        copyFiles: [{ from: path }],
      }
    }
  })

  // add api health check
  api.addRoutes(stack, {
    'GET /health': {
      authorizer: 'none',
      function : {
        functionName: app.logicalPrefixedName('health'),
        handler: 'packages/functions/healthHandler.handler',
      }
    }
  })

  stack.addOutputs({
    SiteUrl: api.url
  });

  return api;
}

