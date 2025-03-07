import { tokensSchema } from '../types'
import { api } from './api'

export const getTokens = async (chain: string, tokenIds: string[]) => {
  return api('/token/list_by_ids', {
    schema: tokensSchema,
    data: { chain_id: chain, ids: tokenIds },
  })
}
