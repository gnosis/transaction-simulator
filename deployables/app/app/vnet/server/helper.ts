import { getTokenByAddress, type TokenBalance } from '@/balances-server'
import { formatUnits, parseUnits, type Log } from 'viem'

const ERC20_TRANSFER_TOPIC =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

const decodeTransferLog = (log: Log) => {
  const from = '0x' + (log.topics[1]?.slice(26) || '')
  const to = '0x' + (log.topics[2]?.slice(26) || '')
  const valueHex = log.data
  const value = BigInt(valueHex).toString()
  return { from, to, value }
}

/**
 * Processes an array of transfer logs and updates the deltas record with the amounts transferred to the specified address.
 *
 * @param logs - An array of log objects representing transfer events.
 * @param address - The target address (avatar address) to check for incoming transfers.
 * @param deltas - A record object where the keys are token addresses and the values are the accumulated transfer amounts.
 *
 * @returns The updated deltas record with the amounts transferred to the specified address.
 */
export const processTransferLogs = (
  currentDeltas: Record<string, bigint>,
  logs: Log[],
  address: string, //avatar address
): Record<string, bigint> =>
  logs.reduce((newDeltas, log) => {
    const [topic] = log.topics

    if (topic !== ERC20_TRANSFER_TOPIC) {
      return newDeltas
    }

    const { to, from, value } = decodeTransferLog(log)
    const token = log.address.toLowerCase()
    const amount = BigInt(value)

    if (to.toLowerCase() === address.toLowerCase()) {
      // Avatar receives tokens => increment delta
      return { ...newDeltas, [token]: (newDeltas[token] ?? 0n) + amount }
    }

    if (from.toLowerCase() === address.toLowerCase()) {
      // Avatar sends tokens => increment delta
      return {
        ...newDeltas,
        [token]: (newDeltas[token] = (newDeltas[token] ?? 0n) - amount),
      }
    }

    return newDeltas
  }, currentDeltas)

export const applyDeltaToBalances = async (
  existingTokenBalances: TokenBalance[],
  delta: Record<string, bigint>,
  chain: string,
): Promise<TokenBalance[]> => {
  const balanceByAddress = existingTokenBalances.reduce(
    (result, balance) => ({
      ...result,
      [balance.contractId.toLowerCase()]: balance,
    }),
    {} as Record<string, TokenBalance>,
  )

  const newTokenBalances = await Promise.all(
    Object.keys(delta)
      .filter((tokenAddress) => balanceByAddress[tokenAddress] == null)
      .map(async (tokenAddress) => {
        const info = await getTokenByAddress(chain, tokenAddress)

        if (info == null) {
          const decimals = 18
          const amount = formatUnits(0n, decimals)

          return {
            contractId: tokenAddress,
            name: 'Unknown Token',
            amount,
            logoUrl: '',
            symbol: '???',
            usdValue: 0,
            usdPrice: 0,
            decimals,
            chain,
          }
        }

        const decimals = info.decimals || 18
        const amount = formatUnits(0n, decimals)

        return {
          contractId: info.id,
          name: info.name,
          symbol: info.optimized_symbol || info.display_symbol || info.symbol,
          logoUrl: info.logo_url,
          amount,
          decimals,
          usdPrice: info.price || 0,
          usdValue: parseFloat(amount) * (info.price || 0),
          chain: info.chain,
        }
      }),
  )

  return [...existingTokenBalances, ...newTokenBalances].map((balance) => {
    if (delta[balance.contractId.toLowerCase()] == null) {
      return balance
    }

    const decimals = balance.decimals || 18
    const existingRaw = parseUnits(balance.amount, decimals)

    const newRaw = existingRaw + delta[balance.contractId.toLowerCase()]
    const finalRaw = newRaw < 0n ? 0n : newRaw

    const newAmount = formatUnits(finalRaw, decimals)

    return {
      ...balance,

      amount: newAmount,
      usdValue: parseFloat(newAmount) * (balance.usdPrice || 0),
    }
  })
}
