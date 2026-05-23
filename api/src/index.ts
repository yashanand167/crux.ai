import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000

export default {
  port,
  fetch: app.fetch,
}
