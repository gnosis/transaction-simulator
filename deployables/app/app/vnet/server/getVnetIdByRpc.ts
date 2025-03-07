import { getVnetList } from './getVnetList'

export const getVnetIdByRpc = async (
  rpcUrl: string,
): Promise<string | null> => {
  const vnetList = await getVnetList()
  for (const vnet of vnetList) {
    for (const rpc of vnet.rpcs) {
      if (rpc.url === rpcUrl) {
        return vnet.id
      }
    }
  }
  return null
}
