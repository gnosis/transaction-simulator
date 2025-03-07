import type { TokenBalance } from '@/balances-server'
import { createPublicClient, http, parseUnits } from 'viem'
import { getVnetTransactions } from './getVnetTransactions'
import { getVnetTxReceipt } from './getVnetTxReceipt'
import { processTransferLogs } from './helper'

export const getVnetTransactionDelta = async (
  vnetId: string,
  rpc: string,
  address: string,
  baselineBalances: TokenBalance[],
  chain: string,
) => {
  const transactions = await getVnetTransactions(vnetId)

  const relevantTransactions = transactions.filter(
    ({ rpc_method }) =>
      rpc_method === 'eth_sendTransaction' ||
      rpc_method === 'tenderly_sendTransaction',
  )

  const receipts = await Promise.all(
    relevantTransactions.map(({ tx_hash }) => {
      if (tx_hash == null) {
        return null
      }

      return getVnetTxReceipt(rpc, tx_hash)
    }),
  )

  const erc20Deltas = receipts.reduce<Record<string, bigint>>(
    (acc, receipt) => {
      if (!receipt) return acc
      return processTransferLogs(acc, receipt.logs, address)
    },
    {},
  )

  const client = createPublicClient({ transport: http(rpc) })
  const forkNativeBalance = await client.getBalance({ address })

  const baselineNative = baselineBalances.find(
    (b) => b.contractId.toLowerCase() === chain.toLowerCase(),
  )
  let baselineValue = 0n
  if (baselineNative) {
    baselineValue = parseUnits(baselineNative.amount, baselineNative.decimals)
  }
  const diff = forkNativeBalance - baselineValue
  if (diff !== 0n) {
    erc20Deltas[chain.toLowerCase()] =
      (erc20Deltas[chain.toLowerCase()] ?? 0n) + diff
  }

  return erc20Deltas
}
