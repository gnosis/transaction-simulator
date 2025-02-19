import { postMessage, render } from '@/test-utils'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CompanionResponseMessageType } from '@zodiac/messages'
import { encode, type ExecutionRoute } from '@zodiac/schema'
import { createMockExecutionRoute, expectRouteToBe } from '@zodiac/test-utils'
import { describe, it, vi } from 'vitest'

// This should not be needed. However,
// the test rendering for some reason also
// calls the loader of the edit-route route.
vi.mock('@/balances-server', async (importOriginal) => {
  const module = await importOriginal<typeof import('@/balances-server')>()

  return {
    ...module,

    getAvailableChains: vi.fn(),
  }
})

describe('List Routes', () => {
  const loadRoutes = async (...routes: Partial<ExecutionRoute>[]) => {
    const mockedRoutes = routes.map(createMockExecutionRoute)

    await postMessage({
      type: CompanionResponseMessageType.LIST_ROUTES,
      routes: mockedRoutes,
    })

    return mockedRoutes
  }

  it('is possible to edit a route', async () => {
    await render('/edit', {
      version: '3.4.0',
    })

    const [route] = await loadRoutes({ label: 'Test route' })

    await userEvent.click(await screen.findByRole('button', { name: 'Edit' }))

    await postMessage({
      type: CompanionResponseMessageType.PROVIDE_ROUTE,
      route,
    })

    await expectRouteToBe(`/edit/${encode(route)}`)
  })
})
