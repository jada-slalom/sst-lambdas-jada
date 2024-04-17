import fs from 'fs';
import yaml from 'js-yaml';
import { FunctionProps } from "sst/constructs";

export function swaggerToRoutes(filePath: string, handers: Record<string, FunctionProps>) :any {
    
    const swaggerFile = yaml.load(fs.readFileSync(filePath, 'utf8')) as any;
    var apiPath = swaggerFile['paths'];
    var routes:any = {};
    Object.keys(apiPath).forEach(path=>{
      var operations = (apiPath as any)[path];
      Object.keys(operations).forEach(method=>{
        var handlerFileName = (operations[method] as any)["operationId"];
        routes[`${method} ${path}`] = {
          function: handers[handlerFileName]
        };
      });
    });
    return routes;
};