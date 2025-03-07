import { loadExtension, test } from './utils'

test('connection to companion app', async ({ page }) => {
  await loadExtension(page)

  // await page.goto('/create')

  // await expect(
  //   page.getByRole('heading', { name: 'New Account' }),
  // ).toBeInViewport()
})
