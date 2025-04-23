import { OpenAPIHono, z, createRoute } from '@hono/zod-openapi'

const app = new OpenAPIHono()

// index response routes schema
const indexResponseSchema = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
  meta: z.any().nullable(),
  data: z.any().nullable(),
  error: z.any().nullable(),
}).openapi('Index')

// index route
const indexRoute = createRoute({
  method: 'get',
  path: '/',
  summary: 'Entry point',
  description: 'Entry point for the API',
  request: {
    params: z.object({}),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: indexResponseSchema,
        },
      },
      description: 'Success response',
    },
    500: {
      content: {
        'application/json': {
          schema: indexResponseSchema,
        },
      },
      description: 'Error response',
    }
  },
})

// index route controller
app.openapi(indexRoute, (c) => {
  return c.json(
    {
      status: 'ok',
      code: 200,
      message: 'Intern.xyz',
      meta: null,
      data: null,
      error: null,
    },
    200
  )
})

export default app