import { IncomingMessage } from 'http'
import { parse } from 'url'
import { ParsedRequest } from './types'

export const parseRequest = async (req: IncomingMessage) => {
  console.log('HTTP ' + req.url)
  const { pathname } = parse(req.url || '/', true)

  const { itemId, extension } = getItemIdAndExtension(pathname || '')

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    itemId: itemId,
  }
  return parsedRequest
}

const getItemIdAndExtension = (pathname: string) => {
  const dotArr = (pathname || '/').slice(1).split('.')
  let itemId = ''
  let extension = ''
  if (dotArr.length > 1) {
    extension = dotArr.pop() as string
  }
  if (dotArr.length !== 0) {
    const slashArr = dotArr.join('.').split('/')
    if (slashArr.length === 2 && slashArr[0] === 'item') {
      itemId = slashArr.pop() as string
    }
  }
  return { itemId, extension }
}
