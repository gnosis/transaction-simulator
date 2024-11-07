import { ZodiacRoute } from '@/types'
import { vi } from 'vitest'
import { createMockRoute } from './createMockRoute'

export const mockRoute = (route: Partial<ZodiacRoute> = {}) => {
  const mockGet = vi.mocked(chrome.storage.sync.get)
  const mockRoute = createMockRoute(route)

  mockGet.mockImplementation(async (callback) => {
    if (typeof callback === 'function') {
      return callback({ [mockRoute.id]: mockRoute })
    }

    return null
  })
}
