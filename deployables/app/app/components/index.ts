import { lazy } from 'react'

export { AvatarInput } from './AvatarInput'
export { ProvideDevelopmentContext, useIsDev } from './DevelopmentContext'
export * from './navigation'
export { Page } from './Page'
export * from './pilotStatus'
export { Token } from './Token'
export * from './versionManagement'
export * from './wallet'

export const DebugJson = lazy(async () => {
  const { DebugJson } = await import('./DebugJson')

  return { default: DebugJson }
})
