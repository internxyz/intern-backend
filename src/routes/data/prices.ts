import { OpenAPIHono, z, createRoute } from '@hono/zod-openapi'

const app = new OpenAPIHono()


// create data price
// app.post('/prices', (c) => c.json('create data price', 201))


/**
 * name: Get price by ID endpoint
 * description: Get price of a token in specific current by ID
 */
// schema
const PriceRequestSchema = z.object({
  id: z.string().openapi({
    example: 'eth-usd',
  })
})

const PriceSuccessResponseSchema = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
  meta: z.object({}).nullable(),
  data: z.object({
    id: z.string(),
    price: z.string(),
  }).nullable(),
  error: z.object({}).nullable(),
})

const PriceErrorResponseSchema = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
  meta: z.object({}).nullable(),
  data: z.object({}).nullable(),
  error: z.object({
    message: z.string(),
  }).nullable(),
})


// route definition
const getPriceById = createRoute({
  method: 'get',
  summary: 'Get price by ID',
  description: 'Get the price of a token in specific current by ID',
  path: '/prices/{id}',
  request: {
    params: PriceRequestSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PriceSuccessResponseSchema,
        },
      },
      description: 'Token price retrieved successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: PriceErrorResponseSchema,
        },
      },
      description: 'Token price not found',
    },
  },
})

// route controller
app.openapi(getPriceById, (c) => {
  const { id } = c.req.valid('param')
  return c.json(
    {
      status: 'ok',
      code: 200,
      message: 'Price retrieved successfully',
      meta: null,
      data: {
        id,
        price: '2000',
      },
      error: null,
    },
    200 
  )
})



/**
 * name: Get prices by multiple IDs endpoint
 * description: Get prices of multiple tokens in specific currencies by IDs
 */

// schema
const PricesByMultipleIdsRequestSchema = z.object({
  ids: z.string().openapi({
    example: 'eth-usd,btc-usd',
    description: 'Comma-separated list of price IDs'
  })
})

const PricesByMultipleIdsSuccessResponseSchema = z.object({
  status: z.string(),
  code: z.number(),
  message: z.string(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }).nullable(),
  data: z.array(z.object({
    id: z.string(),
    price: z.string(),
  })).nullable(),
  error: z.object({}).nullable(),
})


// route definition
const getPricesByMultipleIds = createRoute({
  method: 'get',
  summary: 'Get prices by multiple IDs',
  description: 'Get prices of multiple tokens in specific currencies by IDs',
  path: '/prices',
  request: {
    query: PricesByMultipleIdsRequestSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PricesByMultipleIdsSuccessResponseSchema,
        },
      },
      description: 'Prices retrieved successfully',
    },
  },
})

// route controller
app.openapi(getPricesByMultipleIds, (c) => {
  const { ids } = c.req.valid('query')
  const idArray = ids.split(',')
  return c.json({
    status: 'ok',
    code: 200,
    message: 'Prices retrieved successfully',
    meta: {
      total: 3,
      page: 1,
      limit: 10,
    },
    data: [
      {
        id: idArray[0],
        price: '2000',
      },
      {
        id: idArray[1],
        price: '90000',
      },
      {
        id: idArray[2],
        price: '140',
      },
    ],
    error: null,
  },
  200
)})



export default app