// This file is auto-generated by @hey-api/openapi-ts


export const $Client = {
    required: ['id', 'name'],
    properties: {
        id: {
            type: 'integer',
            format: 'int64'
        },
        name: {
            type: 'string'
        }
    }
} as const;

export const $Clients = {
    type: 'array',
    items: {
        '$ref': '#/components/schemas/Client'
    }
} as const;

export const $Error = {
    required: ['code', 'message'],
    properties: {
        code: {
            type: 'integer',
            format: 'int32'
        },
        message: {
            type: 'string'
        }
    }
} as const;

export const $get = {
    summary: 'Returns a list of users.',
    description: 'Optional extended description in CommonMark or HTML.',
    responses: {
        200: {
            description: 'A JSON array of user names',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }
} as const;