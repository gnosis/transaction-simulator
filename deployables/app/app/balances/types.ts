import { z } from 'zod'

export const tokenSchema = z.object({
  id: z.string(),
  chain: z.string(),
  name: z.string().nullable(),
  symbol: z.string().nullable(),
  display_symbol: z.string().nullable(),
  optimized_symbol: z.string().nullable(),
  decimals: z.number().int().nullable(),
  logo_url: z.string().nullable(),
  is_core: z.boolean(),
  price: z.number(),
  time_at: z.number().int().nullable(),
})

export const tokensSchema = tokenSchema.array()

const tokenBalanceSchema = tokenSchema.extend({
  amount: z.number(),
  raw_amount: z.number().int(),
})

export const tokenBalancesSchema = tokenBalanceSchema.array()

export type TokenBalance = {
  contractId: string
  name: string | null
  symbol: string | null
  logoUrl: string | null
  amount: string
  decimals: number
  usdValue: number
  usdPrice: number
  chain: string
}

const chainSchema = z.object({
  id: z.string(),
  community_id: z.number().int(),
  name: z.string(),
  logo_url: z.string().nullable(),
  native_token_id: z.string(),
  wrapped_token_id: z.string(),
  is_support_pre_exec: z.boolean(),
})

export type Chain = z.infer<typeof chainSchema>
export const chainListSchema = chainSchema.array()
