import { ContractFactories, KnownContracts } from '@gnosis.pm/zodiac'
import { JsonRpcError } from '../types'
import { AbiCoder } from 'ethers'

const RolesV1Interface =
  ContractFactories[KnownContracts.ROLES_V1].createInterface()
const RolesV1PermissionsInterface =
  ContractFactories[KnownContracts.PERMISSIONS].createInterface()
const RolesV2Interface =
  ContractFactories[KnownContracts.ROLES_V2].createInterface()

export function getRevertData(error: JsonRpcError) {
  // The errors thrown when a transaction is reverted use different formats, depending on:
  //  - wallet (MetaMask vs. WalletConnect)
  //  - RPC provider (Infura vs. Alchemy vs. Tenderly)
  //  - client library (ethers vs. directly using the EIP-1193 provider)

  // first, drill through potential error wrappings down to the original error
  while (typeof error === 'object' && (error as any).error) {
    error = (error as any).error
  }

  // Here we try to extract the revert reason in any of the possible formats
  const message =
    typeof error.data === 'string'
      ? error.data
      : error.data?.originalError?.data ||
        error.data?.data ||
        error.data?.originalError?.message ||
        error.data?.message ||
        error.message

  const prefix = 'Reverted 0x'
  return message.startsWith(prefix)
    ? message.substring(prefix.length - 2)
    : message
}

export function decodeGenericError(error: JsonRpcError) {
  const revertData = getRevertData(error)

  // Solidity `revert "reason string"` will revert with the data encoded as selector of `Error(string)` followed by the ABI encoded string param
  if (revertData.startsWith('0x08c379a0')) {
    try {
      const [reason] = AbiCoder.defaultAbiCoder().decode(
        ['string'],
        '0x' + revertData.slice(10) // skip over selector
      )
      return reason as string
    } catch (e) {
      return revertData
    }
  }

  return revertData
}

export function decodeRolesV1Error(error: JsonRpcError) {
  const revertData = getRevertData(error)
  if (revertData.startsWith('0x')) {
    try {
      return (
        RolesV1Interface.parseError(revertData) ||
        RolesV1PermissionsInterface.parseError(revertData)
      )
    } catch (e) {
      // ignore
    }
  }
  return null
}

export function decodeRolesV2Error(error: JsonRpcError) {
  const revertData = getRevertData(error)

  if (revertData.startsWith('0x')) {
    try {
      return RolesV2Interface.parseError(revertData)
    } catch (e) {
      // ignore
    }
  }

  return null
}
