import {
  getAvailableChains,
  getChain,
  getTokenBalances,
  getTokenByAddress,
  isValidToken,
} from '@/balances-server'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { sleepTillIdle } from '@zodiac/test-utils'
import { afterEach, beforeEach, vi } from 'vitest'
import { createMockChain } from './test-utils/createMockChain'
import { createMockToken } from './test-utils/createMockToken'

Element.prototype.scrollIntoView = vi.fn()

afterEach(async () => {
  await sleepTillIdle()

  cleanup()
})

vi.mock('@/balances-server', async (importOriginal) => {
  const module = await importOriginal<typeof import('@/balances-server')>()

  return {
    ...module,

    isValidToken: vi.fn(),
    getTokenBalances: vi.fn(),
    getAvailableChains: vi.fn(),
    getTokenByAddress: vi.fn(),
    getChain: vi.fn(),
  }
})

const mockGetAvailableChains = vi.mocked(getAvailableChains)
const mockGetChain = vi.mocked(getChain)
const mockGetTokenBalances = vi.mocked(getTokenBalances)
const mockGetTokenByAddress = vi.mocked(getTokenByAddress)
const mockIsValidToken = vi.mocked(isValidToken)

beforeEach(() => {
  mockGetAvailableChains.mockResolvedValue([])
  mockGetTokenBalances.mockResolvedValue([])
  mockGetTokenByAddress.mockResolvedValue(createMockToken())
  mockGetChain.mockResolvedValue(createMockChain())
  mockIsValidToken.mockResolvedValue(true)
})
