import { getRoute, getRoutes, saveLastUsedRouteId } from '@/execution-routes'
import {
  callListeners,
  chromeMock,
  createMockRoute,
  createMockTab,
  createTransaction,
  mockRoute,
  mockRoutes,
  render,
} from '@/test-utils'
import type { ExecutionRoute } from '@/types'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  CompanionAppMessageType,
  type CompanionAppMessage,
} from '@zodiac/messages'
import { expectRouteToBe, randomPrefixedAddress } from '@zodiac/test-utils'
import type { MockTab } from '@zodiac/test-utils/chrome'
import { describe, expect, it, vi } from 'vitest'
import { loader, Root } from './Root'

describe('Root', () => {
  describe('Delete route', () => {
    const mockIncomingDelete = async (routeId: string, tab: MockTab) => {
      await callListeners(
        chromeMock.runtime.onMessage,
        {
          type: CompanionAppMessageType.DELETE_ROUTE,
          routeId,
        } satisfies CompanionAppMessage,
        { id: chromeMock.runtime.id, tab },
        vi.fn(),
      )
    }

    it('removes the route', async () => {
      await mockRoutes({ id: 'test-route' })
      const tab = createMockTab()

      await render('/', [{ path: '/', Component: Root, loader }], {
        activeTab: tab,
      })

      await mockIncomingDelete('test-route', tab)

      expect(getRoutes()).resolves.toEqual([])
    })
  })

  describe('Save route', () => {
    const mockIncomingRouteUpdate = async (
      route: ExecutionRoute,
      tab: MockTab = createMockTab(),
    ) => {
      await callListeners(
        chromeMock.runtime.onMessage,
        {
          type: CompanionAppMessageType.SAVE_ROUTE,
          data: route,
        },
        { id: chromeMock.runtime.id, tab },
        vi.fn(),
      )
    }

    it('stores route data it receives from the companion app', async () => {
      await render('/', [{ path: '/', Component: Root, loader }])

      const route = createMockRoute()

      await mockIncomingRouteUpdate(route)

      await expect(getRoute(route.id)).resolves.toEqual(route)
    })

    it('saves the route when there are transactions but the route stays the same and the avatar has not changed', async () => {
      const route = await mockRoute()
      await saveLastUsedRouteId(route.id)

      await render('/', [{ path: '/', Component: Root, loader }], {
        initialState: [createTransaction()],
      })

      const updatedRoute = { ...route, label: 'Changed label' }

      await mockIncomingRouteUpdate(updatedRoute)

      await expect(getRoute(route.id)).resolves.toEqual(updatedRoute)
    })

    describe('Clearing transactions', () => {
      it('warns about clearing transactions when the avatars differ', async () => {
        const currentAvatar = randomPrefixedAddress()

        const currentRoute = createMockRoute({
          id: 'firstRoute',
          avatar: currentAvatar,
        })

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
          },
        )

        await mockIncomingRouteUpdate({
          ...currentRoute,
          avatar: randomPrefixedAddress(),
        })

        expect(
          await screen.findByRole('dialog', { name: 'Clear transactions' }),
        ).toBeInTheDocument()
      })

      it('does not warn about clearing transactions when the avatars stay the same', async () => {
        const currentRoute = createMockRoute({
          id: 'firstRoute',
          avatar: randomPrefixedAddress(),
        })

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
          },
        )

        await mockIncomingRouteUpdate({
          ...currentRoute,
          label: 'New label',
        })

        expect(
          screen.queryByRole('dialog', { name: 'Clear transactions' }),
        ).not.toBeInTheDocument()
      })

      it('does not warn when the route differs from the currently active one', async () => {
        const currentRoute = createMockRoute({
          id: 'firstRoute',
          avatar: randomPrefixedAddress(),
        })

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
          },
        )

        await mockIncomingRouteUpdate(
          createMockRoute({
            id: 'another-route',
            avatar: randomPrefixedAddress(),
          }),
        )

        expect(
          screen.queryByRole('dialog', { name: 'Clear transactions' }),
        ).not.toBeInTheDocument()
      })

      it('does not warn when no route is currently selected', async () => {
        await saveLastUsedRouteId(null)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
          },
        )

        await mockIncomingRouteUpdate(
          createMockRoute({
            id: 'another-route',
            avatar: randomPrefixedAddress(),
          }),
        )

        expect(
          screen.queryByRole('dialog', { name: 'Clear transactions' }),
        ).not.toBeInTheDocument()
      })

      it('should not warn about clearing transactions when there are none', async () => {
        const currentRoute = createMockRoute({
          id: 'firstRoute',
          avatar: randomPrefixedAddress(),
        })

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render('/', [
          {
            path: '/',
            Component: Root,
            loader,
          },
        ])

        await mockIncomingRouteUpdate({
          ...currentRoute,
          avatar: randomPrefixedAddress(),
        })

        expect(
          screen.queryByRole('dialog', { name: 'Clear transactions' }),
        ).not.toBeInTheDocument()
      })

      it('is saves the incoming route when the user accepts to clear transactions', async () => {
        const currentRoute = createMockRoute()

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
            inspectRoutes: [
              '/:activeRouteId/clear-transactions/:newActiveRouteId',
            ],
          },
        )

        const updatedRoute = {
          ...currentRoute,
          avatar: randomPrefixedAddress(),
        }

        await mockIncomingRouteUpdate(updatedRoute)

        await userEvent.click(
          screen.getByRole('button', { name: 'Clear transactions' }),
        )

        await expect(getRoute(currentRoute.id)).resolves.toEqual(updatedRoute)
      })

      it('clears transactions', async () => {
        const currentRoute = createMockRoute()

        await mockRoutes(currentRoute)
        await saveLastUsedRouteId(currentRoute.id)

        await render(
          '/',
          [
            {
              path: '/',
              Component: Root,
              loader,
            },
          ],
          {
            initialState: [createTransaction()],
            inspectRoutes: [
              '/:activeRouteId/clear-transactions/:newActiveRouteId',
            ],
          },
        )

        const updatedRoute = {
          ...currentRoute,
          avatar: randomPrefixedAddress(),
        }

        await mockIncomingRouteUpdate(updatedRoute)

        await userEvent.click(
          screen.getByRole('button', { name: 'Clear transactions' }),
        )

        await expectRouteToBe(
          `/${currentRoute.id}/clear-transactions/${currentRoute.id}`,
        )
      })
    })
  })
})
