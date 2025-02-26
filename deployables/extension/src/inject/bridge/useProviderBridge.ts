import type { Eip1193Provider } from '@/types'
import { getActiveTab, sendMessageToTab } from '@/utils'
import { invariant } from '@epic-web/invariant'
import {
  InjectedProviderMessageTyp,
  useMessageHandler,
  type InjectedProviderMessage,
  type InjectedProviderResponse,
} from '@zodiac/messages'
import { toQuantity } from 'ethers'
import { useEffect, useRef } from 'react'
import type { ChainId } from 'ser-kit'
import { useWindowId } from './BridgeContext'

const emitEvent = async (eventName: string, eventData: any) => {
  const tab = await getActiveTab()

  invariant(tab.id != null, 'Can only send events to tabs that have an ID')

  sendMessageToTab(tab.id, {
    type: InjectedProviderMessageTyp.INJECTED_PROVIDER_EVENT,
    eventName,
    eventData,
  } satisfies InjectedProviderMessage)
}

type UseProviderBridgeOptions = {
  provider: Eip1193Provider
  chainId?: ChainId
  account?: `0x${string}`
}

export const useProviderBridge = ({
  provider,
  chainId,
  account,
}: UseProviderBridgeOptions) => {
  useHandleProviderRequests(provider)

  const chainIdRef = useRef<ChainId | null>(null)

  useEffect(() => {
    if (chainId == null) {
      return
    }

    if (chainIdRef.current == null) {
      emitEvent('connect', { chainId: toQuantity(chainId) })
    } else {
      emitEvent('chainChanged', [toQuantity(chainId)])
    }

    chainIdRef.current = chainId
  }, [chainId])

  const accountRef = useRef(account)

  useEffect(() => {
    if (accountRef.current == null && account == null) {
      return
    }

    accountRef.current = account

    emitEvent('accountsChanged', account == null ? [] : [account])
  }, [account])
}

const useHandleProviderRequests = (provider: Eip1193Provider) => {
  const currentWindowId = useWindowId()

  useMessageHandler(
    InjectedProviderMessageTyp.INJECTED_PROVIDER_REQUEST,
    ({ request, requestId }, { sendResponse, windowId }) => {
      if (currentWindowId !== windowId) {
        return
      }

      provider
        .request(request)
        .then((response) => {
          sendResponse({
            type: InjectedProviderMessageTyp.INJECTED_PROVIDER_RESPONSE,
            requestId,
            response,
          } satisfies InjectedProviderResponse)
        })
        .catch((error) => {
          sendResponse({
            type: InjectedProviderMessageTyp.INJECTED_PROVIDER_ERROR,
            requestId,
            error: {
              message: error.message,
              code: error.code,
            },
          } satisfies InjectedProviderMessage)
        })

      // without this the response won't be sent
      return true
    },
  )
}
