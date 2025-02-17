import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  index('routes/index.tsx'),
  route('/connect', 'routes/connect.tsx'),

  layout('routes/layout.tsx', [
    route('/tokens', 'routes/tokens/index.tsx', [
      layout('routes/tokens/balances/layout.tsx', [
        route('balances', 'routes/tokens/balances/balances.tsx'),
      ]),
      layout('routes/tokens/send/layout.tsx', [
        route('send/:chain?/:token?', 'routes/tokens/send/send.tsx'),
      ]),
    ]),

    route('/new-route', 'routes/edit/new-route.ts'),

    ...prefix('/edit', [
      index('routes/edit/list-routes.tsx'),
      route(':data', 'routes/edit/edit-route.$data.tsx'),
    ]),

    route('/edit-route/:data', 'routes/legacy-redirects/old-edit-redirect.ts'),

    ...prefix('/create', [
      layout('routes/create/layout.tsx', [index('routes/create/start.tsx')]),
    ]),

    ...prefix('/submit', [
      layout('routes/submit/layout.tsx', [
        index('routes/submit/index.tsx'),
        route(':route/:transactions', 'routes/submit/$route.$transactions.tsx'),
      ]),
    ]),
  ]),

  ...prefix('/:address/:chainId', [
    route('modules', 'routes/$address.$chainId/modules.ts'),
    route('available-safes', 'routes/$address.$chainId/available-safes.ts'),
    route('delegates', 'routes/$address.$chainId/delegates.ts'),
    route('balances', 'routes/$address.$chainId/balances.ts'),
  ]),

  route('/dev/decode/:data', 'routes/dev/decode.tsx'),
] satisfies RouteConfig
