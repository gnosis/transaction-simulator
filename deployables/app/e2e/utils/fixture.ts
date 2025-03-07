/* eslint-disable no-empty-pattern, react-hooks/rules-of-hooks */
import { test as base, chromium, type BrowserContext } from '@playwright/test'
import { fileURLToPath } from 'url'

export const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  context: async ({}, use) => {
    const pathToExtension = fileURLToPath(
      new URL('../../../extension/public', import.meta.url),
    )

    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
      ignoreDefaultArgs: [
        '--disable-component-extensions-with-background-pages',
      ],
    })

    await use(context)
    await context.close()
  },

  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers()
    if (!background) background = await context.waitForEvent('serviceworker')

    const extensionId = background.url().split('/')[2]

    await use(extensionId)
  },
})

export const expect = test.expect
