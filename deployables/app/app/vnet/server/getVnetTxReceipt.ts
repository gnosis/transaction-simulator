import type { TransactionReceipt } from 'viem'

export const getVnetTxReceipt = async (
  rpcUrl: string,
  txHash: string,
): Promise<TransactionReceipt | null> => {
  const body = {
    jsonrpc: '2.0',
    method: 'eth_getTransactionReceipt',
    params: [txHash],
    id: Date.now(),
  }

  const res = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Error calling RPC: ${res.status}`)
  }

  const json = await res.json()
  if (json.error) {
    return null
  }
  return json.result as TransactionReceipt
}
