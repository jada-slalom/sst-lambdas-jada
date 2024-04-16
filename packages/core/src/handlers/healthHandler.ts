import { ApiHandler } from 'sst/node/api'

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: 'OK' }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'content-type': 'application/json'
    }
  }
})
