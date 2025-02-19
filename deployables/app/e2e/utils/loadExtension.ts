import type { Page } from '@playwright/test'
import { expect } from './fixture'
import { getExtensionPage } from './getExtensionPage'

export const loadExtension = async (page: Page) => {
  await page.getByRole('button', { name: 'Open Pilot' }).click()

  const extension = await getExtensionPage(page)

  await expect(
    extension.getByRole('heading', { name: 'Welcome to Zodiac Pilot' }),
  ).toBeInViewport()

  await expect(page.getByText('Connected')).toBeInViewport()

  return extension
}
