import type { HexAddress } from '@zodiac/schema'
import {
  AccountType,
  formatPrefixedAddress,
  type Account,
  type ChainId,
  type PrefixedAddress,
} from 'ser-kit'

type Safe = Extract<Account, { type: AccountType.SAFE }>

export type CreateSafeAccountOptions = {
  chainId: ChainId
  address: HexAddress
}

export const createSafeAccount = ({
  chainId,
  address,
}: CreateSafeAccountOptions): Safe => ({
  type: AccountType.SAFE,
  threshold: NaN,
  address,
  chain: chainId,
  prefixedAddress: formatPrefixedAddress(
    chainId,
    address,
  ).toLowerCase() as PrefixedAddress,
})
