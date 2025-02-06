import { expect, loadExtension, test } from '../utils'

test.describe('Edit route', () => {
  test('it is possible to save a route', async ({ page }) => {
    await page.goto('/new-route')

    const extension = await loadExtension(page)

    await page.getByRole('textbox', { name: 'Label' }).fill('New route')
    await page.getByRole('button', { name: 'Save & Close' }).click()

    await expect(
      extension.getByRole('heading', { name: 'New route' }),
    ).toBeInViewport()
  })
})
