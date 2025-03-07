import { invariantResponse } from '@epic-web/invariant'
import { getTokens } from './getTokens'

export async function getTokenByAddress(chain: string, tokenId: string) {
  const tokens = await getTokens(chain, [tokenId])
  invariantResponse(
    tokens.length > 0,
    `Could not find token for address: ${tokenId}`,
  )
  return tokens[0]
}
