import { OpenAPIHono } from '@hono/zod-openapi'
import dataPrices from './routes/data/prices'
import indexRoute from './routes/index-route'
import infoRoute from './routes/data/info'
import { Scalar } from '@scalar/hono-api-reference'

const app = new OpenAPIHono()


// The OpenAPI documentation will be available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'Intern Backend API',
  },
})

// api docs route with scalar
app.get('/scalar', Scalar({ url: '/doc' }))

// index route
app.route('/', indexRoute)

// data routes
app.route('/data', dataPrices)
app.route('/data', infoRoute)

// config
export default { 
  port: 8000, 
  fetch: app.fetch, 
}
