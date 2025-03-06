import { cowswapSetPreSignature } from './cowswapSetPreSignature'
import { gmxSpecific } from './karpatkeyInstitutional/gmxSpecificMulticall.ts'
import { kpkBridgeAware } from './karpatkeyInstitutional/kpkBridgeAware'
import type { TransactionTranslation } from './types'
import { uniswapMulticall } from './uniswapMulticall'

// ADD ANY NEW TRANSLATIONS TO THIS ARRAY
export const translations: TransactionTranslation[] = [
  uniswapMulticall,
  cowswapSetPreSignature,
  kpkBridgeAware,
  gmxSpecific,
]
