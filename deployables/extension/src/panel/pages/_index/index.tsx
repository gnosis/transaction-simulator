import type { RouteObject } from 'react-router'
import { NoRoutes as Component, loader } from './NoRoutes'

export const NoRoutes: RouteObject = {
  path: '',
  index: true,
  element: <Component />,
  loader,
}
