import { OpenAPIHono, z, createRoute } from '@hono/zod-openapi'

const app = new OpenAPIHono()


// create info price
app.get('/info', (c) => c.json('get info', 200))


export default app