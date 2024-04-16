import { StackContext, Api, use } from "sst/constructs";
import { swaggerToRoutes } from "@payment/openapi";
import { LambdaStack } from "./LambdaStack";

/*
* Generate API from swagger.yaml
*/
export function APIStack({ stack }: StackContext) {
  var handlers = use(LambdaStack);
  // should replaced with SSTAPI from gl tool repo
  // which include gateway default setting, auth setting, etc.

  var api = new Api(stack, `Api`);

  var routes: any = swaggerToRoutes('packages/openapi/swagger.yaml', handlers);

  api.addRoutes(stack, routes);

  stack.addOutputs({
    SiteUrl: api.url
  });
}

