import * as fs from 'node:fs'
import { ApiHandler } from 'sst/node/api'
import * as yaml from 'yaml'

/**
 *  returns the raw OpenAPI spec in json format
 */
export const handler = ApiHandler(async (_evt) => {
  const fileContent = fs.readFileSync(`${process.env['FILEPATH']}`, { encoding: 'utf8' })
  const docs = yaml.parse(fileContent)
  return {
    statusCode: 200,
    body: JSON.stringify(docs)
  }
})
