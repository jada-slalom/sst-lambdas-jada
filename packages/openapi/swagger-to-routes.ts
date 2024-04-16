import yaml from 'js-yaml';
import fs from 'fs';

export function swaggerToRoutes(filePath: string, handers: any):any {
    
    const swaggerFile = yaml.load(fs.readFileSync(filePath, 'utf8')) as any;
    var apiPath = swaggerFile['paths'];
    var routes:any = {};
    Object.keys(apiPath).forEach(path=>{
      var operations = (apiPath as any)[path];
      Object.keys(operations).forEach(method=>{
        var handlerFileName = (operations[method] as any)["operationId"];
        routes[`${method} ${path}`] = handers[handlerFileName];
      });
    });

    return routes;
};