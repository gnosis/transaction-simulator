import { invariant } from '@epic-web/invariant'
import { Page } from '@playwright/test'
import { readFileSync } from 'fs'
import { MutableRefObject } from 'react'
import { fileURLToPath } from 'url'

const web3Content: MutableRefObject<string | null> = { current: null }

declare global {
  type mock = {
    trigger: (event: string, data: unknown) => void
    mock: (options: { chain: string; accounts: { return: string[] } }) => void
  }

  const Web3Mock: mock
}

type MockOptions = { accounts: string[] }

export const mockWeb3 = async (page: Page, { accounts }: MockOptions) => {
  page.addInitScript({
    content: `${getLibraryCode()}\n(() => { Web3Mock.mock(${JSON.stringify({ blockchain: 'ethereum', accounts: { return: accounts } })})})()`,
  })

  return {
    lockWallet() {
      return getConnectFrame(page).evaluate(() => {
        Web3Mock.trigger('accountsChanged', [])
      })
    },
    loadAccounts(accounts: string[]) {
      return getConnectFrame(page).evaluate(
        ([accounts]) => {
          Web3Mock.trigger('accountsChanged', accounts)
        },
        [accounts]
      )
    },
  }
}

const getConnectFrame = (page: Page) => {
  const frame = page.frame({
    url: 'https://connect.pilot.gnosisguild.org/',
  })

  invariant(frame != null, 'Connect iframe not found')

  return frame
}

const getLibraryCode = () => {
  if (web3Content.current == null) {
    web3Content.current = readFileSync(
      fileURLToPath(
        import.meta.resolve('@depay/web3-mock/dist/umd/index.bundle.js')
      ),
      'utf-8'
    )
  }

  return web3Content.current
}
