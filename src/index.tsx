import { Hono } from 'hono'
import {logger} from 'hono/logger'
import { jsxRenderer } from "hono/jsx-renderer";

const app = new Hono()

app.use(logger())

app.get(
  "*",
  jsxRenderer(({ children }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Hono Upload Test</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);

app.get('/', (c) => {
  return c.render(<>
    <h1>ふぉむ</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <input type="text" name="comment" id="a" />
      <input type="submit" value="Upload" />
    </form>
  </>)
})

app.post('/upload', async (c) => {
  const body = await c.req.parseBody()
  const file = body['file']
  const comment = await (await c.req.formData()).get('comment')
  console.log(file, comment)
})

export default app
