import { type RouteObject } from 'react-router'
import { ActiveRoute } from './$activeRouteId'
import { NoRoutes } from './_index'

export const pages: RouteObject[] = [NoRoutes, ActiveRoute]
