import type { ExecutionRoute } from '@zodiac/schema'

export enum CompanionAppMessageType {
  SAVE_ROUTE = 'COMPANION::SAVE_ROUTE',
  SAVE_AND_LAUNCH = 'COMPANION::SAVE_AND_LAUNCH',
  OPEN_PILOT = 'COMPANION::OPEN_PILOT',
  SUBMIT_SUCCESS = 'COMPANION::SUBMIT_SUCCESS',
  REQUEST_FORK_INFO = 'COMPANION::REQUEST_FORK_INFO',
  PING = 'COMPANION::PING',
  REQUEST_VERSION = 'COMPANION::REQUEST_VERSION',
  REQUEST_ROUTES = 'COMPANION::REQUEST_ROUTES',
  REQUEST_ROUTE = 'COMPANION::REQUEST_ROUTE',
  DELETE_ROUTE = 'COMPANION::DELETE_ROUTE',
  LAUNCH_ROUTE = 'COMPANION::LAUNCH_ROUTE',
}

type CompanionAppSaveRouteMessage = {
  type: CompanionAppMessageType.SAVE_ROUTE
  data: ExecutionRoute
}

type CompanionAppOpenPilotMessage = {
  type: CompanionAppMessageType.OPEN_PILOT
}

type CompanionAppSubmitSuccessMessage = {
  type: CompanionAppMessageType.SUBMIT_SUCCESS
}

type CompanionAppRequestForkInfoMessage = {
  type: CompanionAppMessageType.REQUEST_FORK_INFO
}

type CompanionAppPingMessage = {
  type: CompanionAppMessageType.PING
}

type CompanionAppRequestVersionMessage = {
  type: CompanionAppMessageType.REQUEST_VERSION
}

type CompanionAppRequestRoutesMessage = {
  type: CompanionAppMessageType.REQUEST_ROUTES
}

type CompanionAppRequestRouteMessage = {
  type: CompanionAppMessageType.REQUEST_ROUTE
  routeId: string
}

type CompanionAppSaveAndLaunchMessage = {
  type: CompanionAppMessageType.SAVE_AND_LAUNCH
  data: ExecutionRoute
}

type CompanionAppDeleteRouteMessage = {
  type: CompanionAppMessageType.DELETE_ROUTE
  routeId: string
}

type CompanionAppLaunchMessage = {
  type: CompanionAppMessageType.LAUNCH_ROUTE
  routeId: string
}

export type CompanionAppMessage =
  | CompanionAppSaveRouteMessage
  | CompanionAppOpenPilotMessage
  | CompanionAppSubmitSuccessMessage
  | CompanionAppRequestForkInfoMessage
  | CompanionAppPingMessage
  | CompanionAppRequestVersionMessage
  | CompanionAppRequestRoutesMessage
  | CompanionAppRequestRouteMessage
  | CompanionAppSaveAndLaunchMessage
  | CompanionAppDeleteRouteMessage
  | CompanionAppLaunchMessage
