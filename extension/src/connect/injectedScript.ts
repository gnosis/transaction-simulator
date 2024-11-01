import {
  ConnectedWalletMessage,
  ConnectedWalletMessageType,
} from '@/pilot-messages'
import { Eip1193Provider } from '../types'

declare global {
  interface Window {
    ethereum?: Eip1193Provider
    __zodiacPilotInjected?: boolean
  }
}

// relay window messages to the injected provider
window.addEventListener(
  'message',
  async (event: MessageEvent<ConnectedWalletMessage>) => {
    const message = event.data
    if (message.type === ConnectedWalletMessageType.CONNECTED_WALLET_REQUEST) {
      if (!window.ethereum) {
        throw new Error('No ethereum provider')
      }

      const { request } = message
      const logDetails = { request, response: '⏳' } as any
      console.debug(
        `🧑‍✈️ connect request: \x1B[34m${request.method}\x1B[m %O`,
        logDetails
      )

      try {
        const response = await window.ethereum.request(message.request)
        Object.assign(logDetails, { response })
        window.top!.postMessage(
          {
            type: ConnectedWalletMessageType.CONNECTED_WALLET_RESPONSE,
            requestId: message.requestId,
            response,
          } satisfies ConnectedWalletMessage,
          '*'
        )
      } catch (err) {
        console.error('Error sending request to window.ethereum', message, err)
        window.top!.postMessage(
          {
            type: ConnectedWalletMessageType.CONNECTED_WALLET_ERROR,
            requestId: message.requestId,
            error: {
              message: (err as any).message,
              code: (err as any).code,
            },
          } satisfies ConnectedWalletMessage,
          '*'
        )
      }
    }
  }
)

// relay the relevant events from the injected provider to the parent window
const relayEvent = (eventName: string) => {
  if (!window.ethereum) {
    throw new Error('No ethereum provider')
  }

  window.ethereum.on(eventName, (eventData: unknown) => {
    window.top!.postMessage(
      {
        type: ConnectedWalletMessageType.CONNECTED_WALLET_EVENT,
        eventName,
        eventData,
      } satisfies ConnectedWalletMessage,
      '*'
    )
  })
}

const initProvider = () => {
  console.log('🧑‍✈️ Ready to relay requests to connected wallet')
  window.top!.postMessage(
    {
      type: ConnectedWalletMessageType.CONNECTED_WALLET_INITIALIZED,
    },
    '*'
  )

  relayEvent('accountsChanged')
  relayEvent('chainChanged')
  relayEvent('disconnect')
}

if (window.ethereum) {
  initProvider()
} else {
  const handleInitialize = () => {
    window.removeEventListener('ethereum#initialized', handleInitialize)
    initProvider()
  }
  window.addEventListener('ethereum#initialized', handleInitialize)
}
