import test, { expect } from '@playwright/test'
import { encode } from '@zodiac/schema'
import { mockWeb3 } from '@zodiac/test-utils/e2e'
import { connectWallet } from '../connectWallet'
import { account, route, transaction } from './fixture'

test.describe('Account unavailable', () => {
  test('handles unavailable accounts gracefully', async ({ page }) => {
    const { loadAccounts } = await mockWeb3(page, {
      accounts: [account],
      chain: 'gnosis',
    })

    await page.goto(`/submit/${encode(route)}/${encode([transaction])}`)

    await connectWallet(page, account)
    await loadAccounts(['0x2000000000000000000000000000000000000000'])

    await expect(
      page.getByRole('alert', {
        name: `Wallet is set to a different account`,
      }),
    ).toBeInViewport()
  })
})
