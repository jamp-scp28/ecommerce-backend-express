import SwaggerJsdoc from 'swagger-jsdoc'
import Path from 'path'
import { version, description, name } from '../../../../package.json'

const swaggerDefinition: SwaggerJsdoc.SwaggerDefinition = {
    openapi: '3.0.5',
    info: {
        title: name,
        version,
        description
    },
    components: {
        responses: {
            204: { description: 'No content' },
            500: {
                description: 'Internal Error',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/exception'
                        }
                    }
                }
            }
        }
    },
    schemas: {
        exception: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                code: { type: 'string' },
                details: { type: 'string' }
            }
        }
    }
}

export const options: SwaggerJsdoc.Options = {
    swaggerDefinition,
    apis: [
        Path.resolve(__dirname, '../../controllers/*.ts'),
    ]
}
