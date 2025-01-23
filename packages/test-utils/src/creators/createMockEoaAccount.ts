import { ZERO_ADDRESS } from '@zodiac/chains'
import type { HexAddress } from '@zodiac/schema'
import { AccountType, formatPrefixedAddress, type Account } from 'ser-kit'

type Eoa = Extract<Account, { type: AccountType.EOA }>

type CreateMockEoaAccountOptions = {
  address?: HexAddress
}

export const createMockEoaAccount = ({
  address = ZERO_ADDRESS,
}: CreateMockEoaAccountOptions = {}): Eoa => ({
  type: AccountType.EOA,
  address,
  prefixedAddress: formatPrefixedAddress(undefined, address),
})
