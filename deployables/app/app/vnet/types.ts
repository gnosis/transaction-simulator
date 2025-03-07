import { z } from 'zod'

const vnetSchema = z.object({
  id: z.string(),
  slug: z.string(),
  display_name: z.string(),
  status: z.string(),
  fork_config: z.object({
    network_id: z.number(),
    block_number: z.string(),
  }),
  virtual_network_config: z.object({
    chain_config: z.object({
      chain_id: z.number(),
    }),
    accounts: z.array(
      z.object({
        address: z.string(),
      }),
    ),
  }),
  sync_state_config: z.object({
    enabled: z.boolean(),
    commitment_level: z.string(),
  }),
  explorer_page_config: z.object({
    enabled: z.boolean(),
    verification_visibility: z.string(),
  }),
  rpcs: z.array(
    z.object({
      url: z.string(),
      name: z.string(),
    }),
  ),
})

const vnetTransactionSchema = z.object({
  id: z.string(),
  vnet_id: z.string(),
  tx_hash: z.string().optional(),
  block_number: z.string(),
  status: z.string(),
  rpc_method: z.string().optional(),
})

export type VnetTransaction = z.infer<typeof vnetTransactionSchema>
export const vnetTransactionsListSchema = vnetTransactionSchema.array()
export const vnetListSchema = vnetSchema.array()
