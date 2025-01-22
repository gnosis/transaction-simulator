import { ContractFactories, KnownContracts } from '@gnosis.pm/zodiac'

const interfaces = {
  [KnownContracts.DELAY]: ContractFactories[KnownContracts.DELAY],
  [KnownContracts.ROLES_V1]: ContractFactories[KnownContracts.ROLES_V1],
  [KnownContracts.ROLES_V2]: ContractFactories[KnownContracts.ROLES_V2],
  [KnownContracts.PERMISSIONS]: ContractFactories[KnownContracts.PERMISSIONS],
} as const

export function getInterface<Module extends keyof typeof interfaces>(
  moduleType: Module,
): ReturnType<(typeof interfaces)[Module]['createInterface']> {
  // @ts-expect-error I don't know how to make this super duper type-safe
  return interfaces[moduleType].createInterface()
}
