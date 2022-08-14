import core from 'puppeteer-core'
import { getOptions } from './options'
import { FileType } from './types'
let _page: core.Page | null

async function getPage(url: string, isDev: boolean) {
  if (_page) {
    return _page
  }
  const options = await getOptions(isDev)
  const browser = await core.launch(options)
  _page = await browser.newPage()
  await _page.goto(url)
  return _page
}

export async function getScreenshot(
  url: string,
  type: FileType,
  isDev: boolean
) {
  const page = await getPage(url, isDev)
  await page.setViewport({ width: 2048, height: 1170 })
  const file = await page.screenshot({ type })
  return file
}
