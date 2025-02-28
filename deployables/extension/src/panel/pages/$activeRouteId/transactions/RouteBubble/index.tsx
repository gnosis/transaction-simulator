import { useCompanionAppUrl } from '@/companion'
import { useExecutionRoute } from '@/execution-routes'
import { Transition } from '@headlessui/react'
import {
  getPilotAddress,
  getRolesWaypoint,
  getStartingWaypoint,
} from '@zodiac/modules'
import { encode, type HexAddress } from '@zodiac/schema'
import { Blockie } from '@zodiac/ui'
import { AlignJustify, Cog } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import Stick from 'react-stick'
import { unprefixAddress } from 'ser-kit'
import { ConnectionStack } from '../../../ConnectionStack'

export const RouteBubble = () => {
  const route = useExecutionRoute()
  const [hover, setHover] = useState(false)

  const pilotAddress = getPilotAddress([getStartingWaypoint(route.waypoints)])
  const rolesWaypoint = getRolesWaypoint(route)

  return (
    <Stick
      sameWidth
      className="flex justify-between gap-2 overflow-hidden rounded-full border border-zinc-200/80 bg-zinc-100/80 text-zinc-600 hover:border-zinc-300/80 dark:border-zinc-600/80 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-500/80"
      position="bottom center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      node={
        <Transition
          show={hover}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enter="transition-opacity"
          leave="transition-opacity"
        >
          <div className="isolate z-10 pt-2">
            <div className="backdrop-blur-xs rounded-md border border-zinc-200/80 bg-zinc-100/80 px-4 py-2 shadow-lg dark:border-zinc-500/80 dark:bg-zinc-900/80">
              <ConnectionStack route={route} />
            </div>
          </div>
        </Transition>
      }
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Blockies
          avatarAddress={unprefixAddress(route.avatar)}
          moduleAddress={
            rolesWaypoint == null ? undefined : rolesWaypoint.account.address
          }
          pilotAddress={pilotAddress}
        />

        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
          {route.label || <span className="italic">Unnamed route</span>}
        </h1>
      </div>

      <div className="flex shrink-0">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={`${useCompanionAppUrl()}/edit/${encode(route)}`}
          className="flex items-center justify-center p-2 text-zinc-400 transition-all hover:bg-zinc-200/80 hover:text-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-500/80 dark:hover:text-zinc-300"
        >
          <span className="sr-only">Edit route</span>
          <Cog size={20} />
        </Link>

        <Link
          target="_blank"
          rel="noopener noreferrer"
          to={`${useCompanionAppUrl()}/edit`}
          className="flex items-center justify-center p-2 text-zinc-400 transition-all hover:bg-zinc-200/80 hover:text-zinc-500 dark:text-zinc-200 dark:hover:bg-zinc-500/80 dark:hover:text-zinc-300"
        >
          <span className="sr-only">Configure routes</span>
          <AlignJustify size={20} />
        </Link>
      </div>
    </Stick>
  )
}

type BlockiesProps = {
  avatarAddress: HexAddress
  pilotAddress?: HexAddress
  moduleAddress?: HexAddress
}

const Blockies = ({
  pilotAddress,
  moduleAddress,
  avatarAddress,
}: BlockiesProps) => (
  <div className="flex h-10 shrink-0 p-1">
    {pilotAddress && (
      <div className="rounded-full border-2 border-slate-500 dark:border-slate-900">
        <Blockie address={pilotAddress} className="h-full" />
      </div>
    )}
    {moduleAddress && (
      <div className="-ml-4 rounded-full border-2 border-slate-500 first:ml-0 dark:border-slate-900">
        <Blockie address={moduleAddress} className="h-full" />
      </div>
    )}
    <div className="-ml-4 rounded-full border-2 border-slate-500 first:ml-0 dark:border-slate-900">
      <Blockie address={avatarAddress} className="h-full" />
    </div>
  </div>
)
