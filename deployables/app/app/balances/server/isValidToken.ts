import { getTokens } from './getTokens'

export const isValidToken = async (chain: string, tokenId: string) => {
  const tokens = await getTokens(chain, [tokenId])
  return tokens.length !== 0
}
