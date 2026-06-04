import { Hono } from 'hono'
import ENV from "./validators/env.validator";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = ENV.PORT

export default {
  port,
  fetch: app.fetch,
}
