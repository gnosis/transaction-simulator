import { getTokenByAddress, type TokenBalance } from '@/balances-server'
import { describe, expect, it, vi } from 'vitest'

import { parseUnits } from 'viem'
import { applyDeltaToBalances } from './helper'

const mockGetTokenByAddress = vi.mocked(getTokenByAddress)

describe('applyDeltaToBalances', () => {
  it('Adjust balance for an existing token', async () => {
    const mainnetBalances: TokenBalance[] = [
      {
        contractId: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
        name: 'Tether USD',
        symbol: 'USDT',
        logoUrl: '...',
        amount: '38062.089368',
        decimals: 6,
        usdPrice: 1,
        usdValue: 38062.08,
        chain: 'eth',
      },
    ]
    const delta = {
      '0xdac17f958d2ee523a2206206994597c13d831ec7': 100_000000n,
    }
    const result = await applyDeltaToBalances(mainnetBalances, delta, 'eth')
    // (38062.089368 + 100)
    expect(result).toHaveLength(1)
    const updated = result[0]
    expect(updated.contractId).toBe(
      '0xdac17f958d2ee523a2206206994597c13d831ec7',
    )

    expect(updated.amount).toBe('38162.089368')
  })

  it('Add a new token recognized by DBank', async () => {
    const newTokenAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
    const delta = {
      [newTokenAddress]: parseUnits('200', 6), // 200.000000 USDC
    }

    mockGetTokenByAddress.mockResolvedValueOnce({
      id: newTokenAddress,
      name: 'USD Coin',
      symbol: 'USDC',
      display_symbol: 'USDC',
      optimized_symbol: null,
      logo_url: '...',
      decimals: 6,
      price: 1.0,
      chain: 'eth',
      is_core: false,
      time_at: null,
    })

    const [result] = await applyDeltaToBalances([], delta, 'eth')

    expect(result).toMatchObject({
      amount: '200',
      symbol: 'USDC',
      usdValue: 200,
    })
  })

  it('Ensure negative balance is forced to zero', async () => {
    const mainnetBalances: TokenBalance[] = [
      {
        contractId: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        name: 'Tether USD',
        symbol: 'USDT',
        logoUrl: '...',
        amount: '10', // 10 USDT
        decimals: 6,
        usdPrice: 1,
        usdValue: 10,
        chain: 'eth',
      },
    ]

    const delta = {
      '0xdac17f958d2ee523a2206206994597c13d831ec7': -20_000000n,
    }

    const result = await applyDeltaToBalances(mainnetBalances, delta, 'eth')

    expect(result).toHaveLength(1)
    const updated = result[0]
    expect(updated.amount).toBe('0')
  })
})
