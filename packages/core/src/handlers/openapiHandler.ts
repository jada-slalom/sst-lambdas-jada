import { ApiHandler } from 'sst/node/api'

/**
 * API Handler for /api
 *  Renders the OpenAPI UI
 */
export const handler = ApiHandler(async (_evt) => {
  const body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>OpenAPI UI</title>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css" />
  </head>
  <body>
    <div id="swagger"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.min.js"></script>
    <script>
      SwaggerUIBundle({
        defaultModelRendering: 'example',
        displayRequestDuration: 'true',
        dom_id: '#swagger',
        persistAuthorization: 'true',
        url: "/api-json",
        withCredentials: 'true'
      })
    </script>
  </body>
  </html>`

  return {
    statusCode: 200,
    headers: {
      ['Content-Type']: 'text/html'
    },
    body
  }
})
