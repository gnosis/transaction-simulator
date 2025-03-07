import { vnetListSchema } from '../types'
import { api } from './api'

export const getVnetList = async () => {
  return api('/', { schema: vnetListSchema })
}
