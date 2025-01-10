import { getChainId } from '@zodiac/chains'
import { type ExecutionRoute, ProviderType } from '@zodiac/schema'
import { ZeroAddress } from 'ethers'
import { type ChainId, parsePrefixedAddress } from 'ser-kit'
import { InjectedWallet } from './injectedWallet'

interface Props {
  route: ExecutionRoute
  onConnect(args: {
    providerType: ProviderType
    chainId: ChainId
    account: string
  }): void
  onDisconnect(): void
  onError: () => void
}

export const ConnectWallet = ({
  route,
  onConnect,
  onDisconnect,
  onError,
}: Props) => {
  const pilotAddress = getPilotAddress(route)
  const chainId = getChainId(route.avatar)

  // const isConnected = (
  //   provider: InjectedWalletContextT | WalletConnectResult,
  // ) =>
  //   route.initiator != null &&
  //   isConnectedBase(provider, route.initiator, chainId)

  // not connected
  if (pilotAddress == null) {
    return (
      <div className="flex flex-col gap-2">
        {/* <WalletConnectConnect
          routeId={route.id}
          onConnect={(chainId, account) =>
            onConnect({
              providerType: ProviderType.WalletConnect,
              chainId,
              account,
            })
          }
          onError={onError}
        /> */}

        {/* <InjectedWalletConnect
          onConnect={(chainId, account) =>
            onConnect({
              providerType: ProviderType.InjectedWallet,
              chainId,
              account,
            })
          }
          onError={onError}
        /> */}
      </div>
    )
  }

  switch (route.providerType) {
    case ProviderType.InjectedWallet:
      return (
        <InjectedWallet
          chainId={chainId}
          pilotAddress={pilotAddress}
          onDisconnect={onDisconnect}
          onError={onError}
        />
      )
    case ProviderType.WalletConnect:
      return null
    // return (
    //   <WalletConnect
    //     chainId={chainId}
    //     pilotAddress={pilotAddress}
    //     routeId={route.id}
    //     isConnected={() => true}
    //     onDisconnect={onDisconnect}
    //     onError={onError}
    //   />
    // )
  }
}

const getPilotAddress = (route: ExecutionRoute) => {
  if (route.initiator == null) {
    return null
  }

  const address = parsePrefixedAddress(route.initiator).toLowerCase()

  if (address === ZeroAddress) {
    return null
  }

  return address
}
