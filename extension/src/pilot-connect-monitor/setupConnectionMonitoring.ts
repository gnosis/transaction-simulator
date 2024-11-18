// injects a minimal script into the page to hint the user to reload the page when the panel is toggled

import { Message, PilotMessageType } from '@/messages'
import { injectScript } from '@/utils'

window.document.documentElement.dataset.__zodiacPilotBasePath =
  chrome.runtime.getURL('/')
window.document.documentElement.dataset.__zodiacExtensionId = chrome.runtime.id

injectScript('build/pilot-connect-monitor/handleConnectionStatusChange.js')

chrome.runtime.onMessage.addListener((message: Message) => {
  if (
    message.type === PilotMessageType.PILOT_CONNECT ||
    message.type === PilotMessageType.PILOT_DISCONNECT
  ) {
    document.documentElement.dataset.__zodiacPilotConnected = (
      message.type === PilotMessageType.PILOT_CONNECT
    ).toString()
    window.postMessage(message, '*')
  }
})

export {}
