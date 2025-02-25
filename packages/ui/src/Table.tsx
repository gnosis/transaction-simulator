import classNames from 'classnames'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

export const Table = ({ children }: PropsWithChildren) => (
  <table className="w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:shadow-md">
    {children}
  </table>
)

const THead = ({ children }: PropsWithChildren) => <thead>{children}</thead>

Table.THead = THead

const TBody = ({ children }: PropsWithChildren) => <tbody>{children}</tbody>

Table.TBody = TBody

const Tr = ({ children }: PropsWithChildren) => (
  <tr className="group">{children}</tr>
)

Table.Tr = Tr

type Align = 'left' | 'center' | 'right'

type ThProps = PropsWithChildren<{ align?: Align; className?: string }>

const Th = ({ children, align = 'left', className }: ThProps) => (
  <th
    className={classNames(
      'border-b-2 border-zinc-300 px-2 py-2 text-sm uppercase text-zinc-600 dark:border-zinc-700 dark:text-white',

      align === 'left' && 'text-left',
      align === 'right' && 'text-right',
      align === 'center' && 'text-center',

      className,
    )}
  >
    {children}
  </th>
)

Table.Th = Th

type TdProps = Omit<ComponentPropsWithoutRef<'td'>, 'className'> &
  PropsWithChildren<{
    align?: Align
    noWrap?: boolean
  }>

const Td = ({
  children,
  align = 'left',
  noWrap = false,
  ...props
}: TdProps) => (
  <td
    {...props}
    className={classNames(
      'border-b border-zinc-300 px-2 py-1.5 text-sm text-zinc-900/75 group-last:border-b-0 group-hover:bg-zinc-200 group-hover:text-zinc-900 dark:border-zinc-700 dark:text-white/75 dark:group-hover:bg-zinc-900 dark:group-hover:text-white',
      align === 'left' && 'text-left',
      align === 'right' && 'text-right',
      align === 'center' && 'text-center',

      noWrap && 'whitespace-nowrap',
    )}
  >
    {children}
  </td>
)

Table.Td = Td
