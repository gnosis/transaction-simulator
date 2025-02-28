import { Chain } from '@zodiac/chains'
import {
  createMockEndWaypoint,
  createMockEoaAccount,
  createMockExecutionRoute,
  createMockOwnsConnection,
  createMockStartingWaypoint,
  createMockWaypoints,
} from '@zodiac/test-utils'
import { prefixAddress, unprefixAddress } from 'ser-kit'

const initiator = prefixAddress(
  undefined,
  '0xf06a3a90f9a248630bd15f9debc7a6a20e54677d',
)

export const route = createMockExecutionRoute({
  initiator,
  avatar: prefixAddress(
    Chain.GNO,
    '0xb1578ecfa1da7405821095aa3612158926e6a72a',
  ),
  waypoints: createMockWaypoints({
    start: createMockStartingWaypoint(
      createMockEoaAccount({ address: unprefixAddress(initiator) }),
    ),
    end: createMockEndWaypoint({
      account: {
        chainId: Chain.GNO,
        address: '0xb1578ecfa1da7405821095aa3612158926e6a72a',
      },
      connection: createMockOwnsConnection(initiator),
    }),
  }),
})
