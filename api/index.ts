import { IncomingMessage, ServerResponse } from 'http'
import { parseRequest } from './_lib/parser'
import { getScreenshot } from './_lib/chromium'

const isDev = !process.env.AWS_REGION

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const parsedReq = await parseRequest(req)
    if (!parsedReq.itemId) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end('<h1>Not found</h1><p>Sorry, could not find a requested item</p>')
      return
    }
    const url = `https://farcasternews.xyz/item/${parsedReq.itemId}`
    const { fileType } = parsedReq
    const file = await getScreenshot(url, fileType, isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType}`)
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
