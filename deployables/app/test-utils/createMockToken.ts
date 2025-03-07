import { randomAddress } from '@zodiac/test-utils'
import type { z } from 'zod'
import type { tokenSchema } from '../app/balances/types'

export type MockTokenData = z.infer<typeof tokenSchema>

export const createMockToken = (
  overrides: Partial<MockTokenData> = {},
): MockTokenData => {
  return {
    id: randomAddress(),
    chain: 'eth',
    name: 'Mock token',
    symbol: 'MOCK',
    display_symbol: null,
    optimized_symbol: null,
    decimals: 18,
    logo_url: null,
    is_core: false,
    price: 1.0,
    time_at: null,
    ...overrides,
  }
}
